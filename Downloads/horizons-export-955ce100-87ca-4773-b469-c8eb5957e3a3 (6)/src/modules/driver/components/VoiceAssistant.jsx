import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VoiceAssistant = () => {
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Fonctionnalité en cours de développement",
      description: "L'assistant vocal IA sera bientôt disponible pour vous guider !",
    });
  };

  return (
    <Card className="bg-lilou-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lilou-text-primary">
          <Mic />
          Assistant Vocal IA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-lilou-text-secondary text-center">Appuyez pour parler à l'assistant. Demandez des directions, signalez un incident, ou plus.</p>
        <Button onClick={handleFeatureClick} size="lg" className="bg-lilou-ai-accent hover:bg-lilou-ai-accent/80 rounded-full p-6">
          <Mic size={32} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;