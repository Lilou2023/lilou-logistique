import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ModuleOverviewCard from '@/components/common/ModuleOverviewCard';
import {
  Home,
  LayoutDashboard,
  Edit,
  Truck,
  FileText,
  BarChart2,
  ShieldCheck,
  Users,
  Wrench,
  GitBranch,
  ArrowDown,
  ArrowRight,
  Zap,
  Brain,
  MessageSquare,
  ClipboardList,
  TrendingUp,
  Target,
  Clock,
  Package,
  MapPin,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  UserX,
  CalendarCheck,
  CalendarX,
  DollarSign,
  Gauge,
  Activity,
  Settings,
  Database,
  Cloud,
  Code,
  RefreshCw,
  Bell,
  Eye,
  Search,
  Filter,
  List,
  Plus,
  Minus,
  X,
  Check,
  Info,
  Rocket,
} from 'lucide-react';

const ArchitectureOverviewPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>Architecture Lilou Logistique - Vue d'ensemble</title>
        <meta name="description" content="Découvrez l'architecture visuelle de l'application DSP Lilou Logistique, ses modules principaux et leurs interconnexions." />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-purple-400">
          <img  alt="Lilou-GO logo" class-name="inline-block h-10 w-10 mr-4" style={{ filter: 'drop-shadow(0 0 5px #805AD5)' }} src="https://images.unsplash.com/photo-1523309781728-c6848d462d1e" />
          Architecture visuelle de l'application DSP Lilou Logistique
        </h1>

        {/* Accueil Général */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 p-6 bg-gray-800 rounded-xl shadow-lg text-center"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center mb-4">
            <Home size={32} className="mr-3 text-blue-400" />
            <h2 className="text-3xl font-bold">Accueil général (interface principale)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <span className="p-3 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"><LayoutDashboard size={18} className="mr-2" /> Dashboard Manager</span>
            <span className="p-3 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"><Edit size={18} className="mr-2" /> Saisie Dispatcher</span>
            <span className="p-3 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"><Truck size={18} className="mr-2" /> Tableau Chauffeur</span>
            <span className="p-3 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"><FileText size={18} className="mr-2" /> Documents RH</span>
            <span className="p-3 bg-gray-700 rounded-lg text-sm font-medium flex items-center justify-center"><Brain size={18} className="mr-2" /> Pilotage IA</span>
          </div>
        </motion.div>

        {/* Flèche vers les modules principaux */}
        <motion.div
          className="flex justify-center my-8"
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
        >
          <ArrowDown size={48} className="text-gray-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Module Dispatcher */}
          <ModuleOverviewCard
            id="Module Dispatcher"
            title="(Saisie quotidienne)"
            description=""
            features={[
              { text: "Chauffeur", icon: "UserCheck" },
              { text: "Colis livrés", icon: "Package" },
              { text: "DNR", icon: "AlertTriangle" },
              { text: "POD conformité", icon: "CheckCircle" },
              { text: "Contact Compliance", icon: "UserCheck" },
              { text: "Incidents client", icon: "AlertTriangle" },
            ]}
            astucePro={null}
            imageDescription="Un dispatcher travaillant sur un écran de gestion des livraisons."
            icon={Edit}
            backgroundColor="#1A202C"
            textColor="#E2E8F0"
            glowColor="#4299E1"
          />

          {/* Module Chauffeur */}
          <ModuleOverviewCard
            id="Module Chauffeur"
            title="(interface personnelle)"
            description=""
            features={[
              { text: "Heatmap chauffeurs", icon: "MapPin" },
              { text: "Liste coaching A / B / C", icon: "ClipboardList" },
              { text: "DNR / POD / Contact Compliance moyenne", icon: "Activity" },
              { text: "Liste Incidents clients ouverts", icon: "AlertTriangle" },
              { text: "Résumé IA quotidien", icon: "Brain" },
            ]}
            astucePro={null}
            imageDescription="Un chauffeur utilisant une application mobile pour ses livraisons."
            icon={Truck}
            backgroundColor="#1A202C"
            textColor="#E2E8F0"
            glowColor="#9F7AEA"
          />

          {/* Flèche entre Dispatcher/Chauffeur et Dashboard Manager */}
          <motion.div
            className="flex justify-center lg:col-span-2 my-8"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          >
            <ArrowDown size={48} className="text-gray-500" />
          </motion.div>

          {/* Dashboard Manager */}
          <ModuleOverviewCard
            id="Dashboard Manager"
            title="(cockpit global)"
            description=""
            features={[
              { text: "Heatmap chauffeurs", icon: "MapPin" },
              { text: "Liste coaching A / B / C", icon: "ClipboardList" },
              { text: "DNR / POD / Contact Compliance moyenne", icon: "Activity" },
              { text: "Liste incidents clients ouverts", icon: "AlertTriangle" },
            ]}
            astucePro={null}
            imageDescription="Un tableau de bord de manager avec des indicateurs clés de performance."
            icon={LayoutDashboard}
            backgroundColor="#1A202C"
            textColor="#E2E8F0"
            glowColor="#ED8936"
          />

          {/* Pilotage IA (Manager IA) - Premier bloc */}
          <ModuleOverviewCard
            id="Pilotage IA"
            title="(Manager IA)"
            description=""
            features={[
              { text: "Synthèse IA quotidienne automatique", icon: "Brain" },
              { text: "Prévision dérive 30/60/90 jours", icon: "TrendingUp" },
            ]}
            astucePro={null}
            imageDescription="Un écran affichant des prévisions et analyses générées par l'IA."
            icon={Brain}
            backgroundColor="#1A202C"
            textColor="#E2E8F0"
            glowColor="#6B46C1"
          />

          {/* Flèche entre Dashboard Manager et Pilotage IA (Manager IA) */}
          <motion.div
            className="flex justify-center lg:col-span-2 my-8"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          >
            <ArrowDown size={48} className="text-gray-500" />
          </motion.div>

          {/* Pilotage IA (Manager IA) - Deuxième bloc */}
          <ModuleOverviewCard
            id="Pilotage IA"
            title="(Manager IA)"
            description=""
            features={[
              { text: "Assistant IA conversationnel", icon: "MessageSquare" },
              { text: "Préparer plan coaching", icon: "ClipboardList" },
              { text: "Analyser chauffeurs critiques", icon: "UserX" },
              { text: "Préparer rapport Amazon-ready", icon: "FileText" },
              { text: "Calculer risque volume", icon: "Target" },
            ]}
            astucePro={null}
            imageDescription="Un assistant IA aidant à la prise de décision stratégique."
            icon={Brain}
            backgroundColor="#1A202C"
            textColor="#E2E8F0"
            glowColor="#6B46C1"
          />
        </div>
      </div>
    </>
  );
};

export default ArchitectureOverviewPage;