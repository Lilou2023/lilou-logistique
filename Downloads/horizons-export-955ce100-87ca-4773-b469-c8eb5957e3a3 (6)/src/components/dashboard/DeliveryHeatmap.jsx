import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const heatmapData = [
  { lat: 48.86, lng: 2.35, intensity: 50 },
  { lat: 48.85, lng: 2.34, intensity: 30 },
  { lat: 48.87, lng: 2.36, intensity: 80 },
  { lat: 48.84, lng: 2.33, intensity: 20 },
  { lat: 48.88, lng: 2.37, intensity: 95 },
  { lat: 48.855, lng: 2.355, intensity: 70 },
  { lat: 48.865, lng: 2.345, intensity: 45 },
];

const DeliveryHeatmap = () => {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: 'var(--radius)' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {heatmapData.map((point, idx) => (
         <Circle
          key={idx}
          center={[point.lat, point.lng]}
          pathOptions={{ 
            color: `hsla(0, 100%, 50%, ${point.intensity / 150})`,
            fillColor: `hsla(0, 100%, 50%, ${point.intensity / 120})`,
            weight: 1
          }}
          radius={point.intensity * 4}
        >
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * idx, type: 'spring' }} />
        </Circle>
      ))}
    </MapContainer>
  );
};

export default DeliveryHeatmap;