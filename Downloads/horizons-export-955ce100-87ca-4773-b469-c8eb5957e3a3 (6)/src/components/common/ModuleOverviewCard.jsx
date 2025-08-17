import React from 'react';
import { motion } from 'framer-motion';
import {
  Check, Info, Rocket, Wrench, Package, GitBranch, Home, LayoutDashboard, Edit, Truck, FileText, BarChart2, ShieldCheck, Users, MapPin, ArrowDown, ArrowRight, Zap, Brain, MessageSquare, ClipboardList, TrendingUp, Target, Clock, AlertTriangle, CheckCircle, UserCheck, UserX, CalendarCheck, CalendarX, DollarSign, Gauge, Activity, Settings, Database, Cloud, Code, RefreshCw, Bell, Eye, Search, Filter, List, Plus, Minus, X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card'; // Using shadcn Card component

const icons = {
  Check: Check,
  Info: Info,
  Rocket: Rocket,
  Wrench: Wrench,
  Package: Package,
  GitBranch: GitBranch,
  Home: Home,
  LayoutDashboard: LayoutDashboard,
  Edit: Edit,
  Truck: Truck,
  FileText: FileText,
  BarChart2: BarChart2,
  ShieldCheck: ShieldCheck,
  Users: Users,
  MapPin: MapPin,
  ArrowDown: ArrowDown,
  ArrowRight: ArrowRight,
  Zap: Zap,
  Brain: Brain,
  MessageSquare: MessageSquare,
  ClipboardList: ClipboardList,
  TrendingUp: TrendingUp,
  Target: Target,
  Clock: Clock,
  AlertTriangle: AlertTriangle,
  CheckCircle: CheckCircle,
  UserCheck: UserCheck,
  UserX: UserX,
  CalendarCheck: CalendarCheck,
  CalendarX: CalendarX,
  DollarSign: DollarSign,
  Gauge: Gauge,
  Activity: Activity,
  Settings: Settings,
  Database: Database,
  Cloud: Cloud,
  Code: Code,
  RefreshCw: RefreshCw,
  Bell: Bell,
  Eye: Eye,
  Search: Search,
  Filter: Filter,
  List: List,
  Plus: Plus,
  Minus: Minus,
  X: X,
};

const ModuleOverviewCard = ({
  id,
  title,
  description,
  features,
  astucePro,
  imageDescription,
  onImageClick,
  icon: IconComponent,
  backgroundColor,
  textColor,
  glowColor,
}) => {
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: "Fonctionnalité non implémentée",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander lors de votre prochaine requête ! 🚀",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-xl shadow-2xl flex flex-col justify-between"
      style={{ backgroundColor, color: textColor }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      // Use the imageDescription for alt text and dynamic content
    >
      {glowColor && (
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: `0 0 50px ${glowColor}, inset 0 0 20px ${glowColor}`,
            opacity: 0.3,
            zIndex: 0,
          }}
        />
      )}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          {IconComponent && (
            <motion.div
              className="p-3 rounded-full mr-3"
              style={{ background: `linear-gradient(135deg, ${glowColor || '#6A0DAD'} 0%, ${backgroundColor} 100%)` }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <IconComponent size={32} />
            </motion.div>
          )}
          <h2 className="text-2xl font-bold flex-grow">{id}. {title}</h2>
        </div>
        
        {description && <p className="mb-4 text-sm opacity-90">{description}</p>}

        {features && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Fonctionnalités</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => {
                const CurrentFeatureIcon = icons[feature.icon] || Check;
                return (
                  <motion.li
                    key={index}
                    className="flex items-center text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    whileHover={{ x: 5 }}
                    onClick={handleFeatureClick}
                  >
                    <CurrentFeatureIcon size={18} className="mr-2" />
                    {feature.text}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}

        {astucePro && (
          <Card className="p-4 bg-purple-900 bg-opacity-30 border border-purple-700 text-purple-100 mt-auto">
            <h4 className="font-semibold text-sm mb-1">Astuce Pro / Top {astucePro.version}</h4>
            <p className="text-xs">{astucePro.text}</p>
          </Card>
        )}
      </div>

      {imageDescription && (
        <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden rounded-b-xl cursor-pointer" onClick={onImageClick}>
          <img  alt={imageDescription} class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ModuleOverviewCard;