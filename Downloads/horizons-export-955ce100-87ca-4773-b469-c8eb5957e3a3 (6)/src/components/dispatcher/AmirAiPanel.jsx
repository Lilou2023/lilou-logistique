import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { BrainCircuit, Lightbulb, AlertTriangle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const RecommendationCard = ({ recommendation, index }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Alerte':
                return <AlertTriangle className="h-5 w-5 text-destructive" />;
            case 'Optimisation':
                return <Lightbulb className="h-5 w-5 text-yellow-500" />;
            default:
                return <Lightbulb className="h-5 w-5 text-blue-500" />;
        }
    };

    const getBadgeVariant = (type) => {
        switch (type) {
            case 'Alerte':
                return 'destructive';
            case 'Optimisation':
                return 'secondary';
            default:
                return 'default';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-card/50 rounded-lg border flex items-start gap-4"
        >
            <div className="mt-1">{getIcon(recommendation.type)}</div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getBadgeVariant(recommendation.type)}>{recommendation.type}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground">{recommendation.module}</span>
                </div>
                <p className="text-sm">{recommendation.text}</p>
            </div>
        </motion.div>
    );
};

const AmirAiPanel = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data, error } = await supabase.functions.invoke('amir-ia-dashboard');
                if (error) throw error;
                setRecommendations(data.recommendations);
            } catch (err) {
                setError('Impossible de charger les recommandations IA.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <div>
                    <h2 className="text-xl font-bold">Amir AI - Assistant</h2>
                    <p className="text-sm text-muted-foreground">Alertes & Conseils en direct</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {error && (
                    <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {error}
                    </div>
                )}
                {!loading && !error && recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default AmirAiPanel;