import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModuleOverviewCard from '@/components/common/ModuleOverviewCard';
import { ShieldCheck, Truck, BarChart2, Users, GitBranch, MapPin, Wrench } from 'lucide-react'; // Example icons
import { useToast } from '@/components/ui/use-toast';

const ModulesOverviewPage = () => {
  const { toast } = useToast();

  const handleImageClick = (moduleName) => {
    toast({
      title: "Visualisation du Module",
      description: `🚧 Le module "${moduleName}" n'est pas encore interactif. Il sera bientôt une réalité ! 🚀`,
    });
  };

  const modules = [
    {
      id: 1,
      title: "Module Authentification & Sécurité",
      description: "(Niveau Fortresse+)",
      features: [
        { text: "Authentification Gutschon", icon: "Check" },
        { text: "Rara Management", icon: "Check" },
        { text: "Reute Midaleware", icon: "Check" },
      ],
      astucePro: {
        version: "0.1.0",
        text: "Vuus autsua prestu rslot rtre in imple-rientani dés Dolit es, õynansqués, Ave Resueis: pranse airre pari salte ceries les oronés",
      },
      imageDescription: "Écran de connexion sécurisé avec éléments d'authentification",
      icon: ShieldCheck,
      backgroundColor: "#1A202C", // Dark background
      textColor: "#E2E8F0", // Light text
      glowColor: "#805AD5", // Purple glow
    },
    {
      id: 2,
      title: "Module Chauffeurs",
      description: "(Driver Zone)",
      features: [], // No specific features listed in the example for this one
      astucePro: {
        version: "0.1.1",
        text: "Inois gerce imsailganis gailifcation întesitiant vena",
      },
      imageDescription: "Un chauffeur souriant avec une tablette et un écran mobile affichant une application de suivi",
      icon: Truck,
      backgroundColor: "#1A202C",
      textColor: "#E2E8F0",
      glowColor: "#4299E1", // Blue glow
    },
    {
      id: 3,
      title: "SAIMIR (Analyse Multi Bolkers)",
      description: "Incjcs Zecurs",
      features: [
        { text: "Extemeut AFIt su! dran legent Au", icon: "Check" },
        { text: "Entelrigent ganiffsaration avee lee badges et.", icon: "Check" },
        { text: "Automatises At nantia", icon: "Check" },
      ],
      astucePro: {
        version: "0.1.2",
        text: "Inatif geat gametfication vatde Metet sc In'Asogres fars tAtfili, enssu ITM",
      },
      imageDescription: "Tableau de bord d'analyse de données avec des graphiques et indicateurs de performance",
      icon: BarChart2,
      backgroundColor: "#1A202C",
      textColor: "#E2E8F0",
      glowColor: "#D69E2E", // Orange/yellow glow
    },
    {
      id: 4,
      title: "Contrôle des véhicules & maintenance prédictive",
      description: "",
      features: [
        { text: "frogirnilte rãe d fetecture", icon: "Check" },
        { text: "ratc de fragiate ma 'n lenance évt predictive", icon: "Check" },
      ],
      astucePro: null,
      imageDescription: "Deux autobus modernes et un écran affichant des données de maintenance",
      icon: Wrench,
      backgroundColor: "#1A202C",
      textColor: "#E2E8F0",
      glowColor: "#38B2AC", // Teal glow
    },
    {
      id: 5,
      title: "Dispatcher & RH Dashboard",
      description: "",
      features: [],
      astucePro: null,
      imageDescription: "Une femme travaille sur un grand écran d'ordinateur affichant un tableau de bord de gestion",
      icon: Users,
      backgroundColor: "#1A202C",
      textColor: "#E2E8F0",
      glowColor: "#ED8936", // Orange glow
    },
    {
      id: 6,
      title: "CI/CD & Déploiement",
      description: "",
      features: [
        { text: "Full Pypeline (CUCD)", icon: "Check" },
        { text: "Rebust script. Deploy", icon: "Check" },
        { text: "Exoorts de dppi. Astseanar", icon: "Check" },
        { text: "Rabust.script 3pploy on", icon: "Check" },
        { text: "Stagina & Préeration", icon: "Check" },
        { text: "Full Production", icon: "Check" },
      ],
      astucePro: {
        version: "0.1.3",
        text: "Autematic u vireae detapses bas rups a bauten de datiabase de change opoeályaincile",
      },
      imageDescription: "Un diagramme de pipeline CI/CD sur un écran, symbolisant le déploiement continu",
      icon: GitBranch,
      backgroundColor: "#1A202C",
      textColor: "#E2E8F0",
      glowColor: "#6B46C1", // Deep purple glow
    },
  ];

  return (
    <>
      <Helmet>
        <title>Lilou Logistique - Présentation des Modules</title>
        <meta name="description" content="Découvrez les différents modules et fonctionnalités de la plateforme Lilou Logistique, incluant l'authentification, les chauffeurs, l'IA et le déploiement." />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-purple-400">
          <img  alt="Lilou-GO logo" class-name="inline-block h-10 w-10 mr-4" style={{ filter: 'drop-shadow(0 0 5px #805AD5)' }} src="https://images.unsplash.com/photo-1664098295863-62a394edad97" />
          LILOU-GO
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {modules.map((module) => (
            <ModuleOverviewCard
              key={module.id}
              id={module.id}
              title={module.title}
              description={module.description}
              features={module.features}
              astucePro={module.astucePro}
              imageDescription={module.imageDescription}
              onImageClick={() => handleImageClick(module.title)}
              icon={module.icon}
              backgroundColor={module.backgroundColor}
              textColor={module.textColor}
              glowColor={module.glowColor}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ModulesOverviewPage;