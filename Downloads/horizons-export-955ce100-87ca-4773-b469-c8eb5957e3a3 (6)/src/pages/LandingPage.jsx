
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Helmet } from 'react-helmet-async';
    import { ArrowRight, Truck, BrainCircuit, ShieldCheck } from 'lucide-react';

    const FeatureCard = ({ icon, title, description, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 text-left"
        >
            <div className="flex items-center gap-4 mb-3">
                {icon}
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
        </motion.div>
    );


    export default function LandingPage() {
      return (
        <>
          <Helmet>
            <title>Lilou-GO - Roulez vers l'excellence !</title>
            <meta name="description" content="Lilou-GO : Suivi, performance et IA logistique au service de vos livraisons." />
          </Helmet>
          <div className="min-h-screen w-full bg-background text-foreground">
             <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.background))] opacity-20" />
                
                <main className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32 pb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Lilou-GO
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                            La plateforme tout-en-un pour les DSP Amazon. Optimisez vos tournées, suivez vos performances et pilotez votre activité grâce à l'intelligence artificielle.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/login">
                                <Button size="lg" className="shadow-lg shadow-primary/20">
                                    Accéder à mon portail <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                             <Link to="/recrutement">
                                <Button size="lg" variant="ghost">
                                    Nous rejoindre
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.2 } }
                        }}
                    >
                        <FeatureCard 
                            icon={<Truck className="h-8 w-8 text-primary"/>}
                            title="Gestion de Flotte Simplifiée"
                            description="Suivi en temps réel, check-lists de départ, et maintenance prédictive pour une flotte toujours opérationnelle."
                            delay={0.8}
                        />
                        <FeatureCard 
                            icon={<BrainCircuit className="h-8 w-8 text-primary"/>}
                            title="Pilotage par IA"
                            description="Notre IA 'Amir' analyse, prédit les dérives et vous fournit des recommandations pour rester au top de la performance."
                            delay={1.0}
                        />
                         <FeatureCard 
                            icon={<ShieldCheck className="h-8 w-8 text-primary"/>}
                            title="Centralisation RH"
                            description="Gérez les profils de vos conducteurs, leurs documents, et le processus de recrutement, tout en un seul endroit."
                            delay={1.2}
                        />
                    </motion.div>
                </main>
            </div>
          </div>
        </>
      );
    }
  