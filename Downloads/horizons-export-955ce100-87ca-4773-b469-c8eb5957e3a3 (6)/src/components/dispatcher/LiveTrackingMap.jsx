import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, Truck } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useToast } from '@/components/ui/use-toast';

const createDriverIcon = (name) => {
  return L.divIcon({
    html: `
      <div class="flex flex-col items-center">
        <div class="p-1.5 bg-lilou-secondary rounded-full shadow-lg">
          <div class="p-1 bg-lilou-surface rounded-full">
             <img src="https://api.dicebear.com/8.x/initials/svg?seed=${name}" class="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div class="mt-1 text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-md">${name}</div>
      </div>
    `,
    className: 'bg-transparent border-0',
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });
};

const LiveTrackingMap = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const fetchInitialLocations = async () => {
        try {
            const { data, error } = await supabase.functions.invoke('get-latest-driver-locations');
            if (error) throw error;
            
            const locationsWithIcons = data.map(loc => ({
                ...loc,
                icon: createDriverIcon(loc.full_name)
            }));
            setLocations(locationsWithIcons);

        } catch (err) {
            setError('Impossible de charger les positions.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialLocations();

        const channel = supabase
            .channel('public:positions')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'positions' },
                async (payload) => {
                    const { data: profile, error } = await supabase.from('profiles').select('full_name').eq('id', payload.new.driver_id).single();
                    if(error) {
                        console.error('Error fetching profile for new location:', error);
                        return;
                    }

                    const newLocation = {
                        ...payload.new,
                        full_name: profile.full_name,
                        icon: createDriverIcon(profile.full_name)
                    };
                    
                    setLocations(currentLocations => {
                        const newMap = new Map(currentLocations.map(loc => [loc.driver_id, loc]));
                        newMap.set(newLocation.driver_id, newLocation);
                        return Array.from(newMap.values());
                    });
                    
                    toast({
                      title: '🛰️ Position mise à jour',
                      description: `Nouvelle position reçue pour ${profile.full_name}.`,
                    })
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [toast]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Carte de Suivi en Direct</CardTitle>
                <CardDescription>Position en temps réel des chauffeurs sur le terrain.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden relative">
                    {loading && (
                        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {error && (
                         <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-destructive">
                            <AlertTriangle className="h-8 w-8 mb-2" />
                            <p>{error}</p>
                        </div>
                    )}
                    <MapContainer center={[48.8566, 2.3522]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {locations.map((loc) => (
                            <Marker key={loc.driver_id} position={[loc.latitude, loc.longitude]} icon={loc.icon}>
                                <Popup>
                                    <b>{loc.full_name}</b><br />
                                    Dernière mise à jour: {new Date(loc.timestamp).toLocaleTimeString()}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default LiveTrackingMap;