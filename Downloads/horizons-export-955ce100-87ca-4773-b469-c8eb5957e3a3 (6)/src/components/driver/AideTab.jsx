import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AmirAiPanel from '@/components/dispatcher/AmirAiPanel';

const faqItems = [
  {
    question: "Que faire si je ne trouve pas l'adresse de livraison ?",
    answer: "Vérifiez d'abord l'adresse dans votre application. Si elle semble incorrecte, essayez de rechercher sur une autre application de cartographie. En dernier recours, contactez le support via le bouton d'urgence."
  },
  {
    question: "Comment signaler une anomalie de livraison (DNR) ?",
    answer: "Dans l'onglet 'Retour', vous pouvez déclarer un retour de colis. Sélectionnez le colis concerné et choisissez le motif du retour. Ajoutez une note si nécessaire."
  },
  {
    question: "Mon véhicule a un problème technique, que faire ?",
    answer: "Si le problème est mineur, notez-le pour le signaler à votre retour. Si le problème est majeur et immobilise le véhicule, utilisez le bouton d'urgence pour contacter immédiatement le support et le chef de parc."
  },
    {
    question: "Comment puis-je améliorer mon score de performance ?",
    answer: "Votre score est principalement basé sur votre taux de POD (preuve de livraison) et votre faible taux de DNR (livraison non réalisée). Assurez-vous de scanner chaque colis, de prendre une photo claire pour chaque livraison, et de suivre les instructions pour minimiser les retours."
  }
];

export function AideTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Foire Aux Questions (FAQ)</CardTitle>
                    <CardDescription>Trouvez rapidement des réponses à vos questions les plus fréquentes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <AmirAiPanel />
        </div>
    </div>
  );
}