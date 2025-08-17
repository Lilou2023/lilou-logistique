import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, AlertTriangle, FileText, Users, Truck, History, LogOut, BrainCircuit } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const navItems = [
  { name: 'Dashboard', path: '/gm/dashboard', icon: LayoutDashboard },
  { name: 'Alertes', path: '/gm/alerts', icon: AlertTriangle },
  { name: 'Rapports Amazon', path: '/gm/amazon-reports', icon: FileText },
  { name: 'RH & Formation', path: '/gm/rh-training', icon: Users },
  { name: 'Flotte & Dispatch', path: '/gm/fleet-dispatch', icon: Truck },
  { name: 'Logs Actions', path: '/gm/actions-log', icon: History },
];

const Sidebar = () => {
  const location = useLocation();
  const { signOut, profile } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    toast({ title: 'Déconnexion en cours...' });
    await signOut();
  };

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fonctionnalité en développement",
      description: "Cette section sera bientôt disponible.",
    });
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-card p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <BrainCircuit className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-lg font-bold text-foreground">GM Cockpit</h1>
          <p className="text-xs text-muted-foreground">{profile?.full_name}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isImplemented = ['/gm/dashboard', '/gm/amazon-reports', '/gm/alerts'].includes(item.path);
          return (
            <NavLink
              key={item.name}
              to={isImplemented ? item.path : '#'}
              onClick={!isImplemented ? handleNotImplemented : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium
                ${isActive && isImplemented ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}
                ${!isImplemented ? 'cursor-not-allowed opacity-60' : ''}`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
        <LogOut className="h-5 w-5 mr-3" />
        Déconnexion
      </Button>
    </aside>
  );
};

const GeneralManagerLayout = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GeneralManagerLayout;