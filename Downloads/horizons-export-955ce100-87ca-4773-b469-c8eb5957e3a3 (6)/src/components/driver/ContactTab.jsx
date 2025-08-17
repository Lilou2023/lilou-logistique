import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Briefcase, FileUp, FileDown } from 'lucide-react';

const ContactCard = ({ title, contacts, onAction }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        {title === 'Opérationnel' ? <Phone /> : <Briefcase />}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {contacts.map((contact, index) => (
        <div key={index} className="flex justify-between items-center">
          <p className="font-medium">{contact.role}</p>
          <Button variant="outline" size="sm" onClick={() => onAction(`Contacter ${contact.role}`)}>
             Appeler
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>
);

const DocumentCard = ({ onAction }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        <FileDown />
        Documents RH
      </CardTitle>
      <CardDescription>Déposez ou consultez vos documents administratifs.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
       <div className="p-4 bg-muted rounded-lg text-center border">
         <p className="font-semibold mb-2">Vous avez 1 nouveau document :</p>
         <p className="text-sm text-muted-foreground">Contrat_de_travail_avenant.pdf</p>
       </div>
       <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" variant="secondary" onClick={() => onAction('Télécharger mes documents')}>
                <FileDown className="mr-2 h-4 w-4" /> Télécharger
            </Button>
            <Button className="flex-1" onClick={() => onAction('Déposer un document')}>
                <FileUp className="mr-2 h-4 w-4" /> Déposer (ex: arrêt maladie)
            </Button>
       </div>
    </CardContent>
  </Card>
);


export function ContactTab() {
  const { toast } = useToast();

  const handleAction = (message) => {
    toast({
      title: '🚧 Fonctionnalité en développement',
      description: `${message} n'est pas encore disponible.`,
    });
  };

  const operationalContacts = [
    { role: 'Dispatcher' },
    { role: 'Chef de Parc' },
  ];

  const adminContacts = [
    { role: 'Manager' },
    { role: 'Ressources Humaines' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <ContactCard title="Opérationnel" contacts={operationalContacts} onAction={handleAction} />
        <ContactCard title="Administratif" contacts={adminContacts} onAction={handleAction} />
      </div>
      <div>
        <DocumentCard onAction={handleAction} />
      </div>
    </div>
  );
}