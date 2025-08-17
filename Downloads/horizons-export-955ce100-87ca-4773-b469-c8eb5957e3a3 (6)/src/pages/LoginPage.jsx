import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Lilou-GO</title>
        <meta name="description" content="Connectez-vous à votre espace Lilou-GO pour accéder à votre tableau de bord personnalisé." />
      </Helmet>
      <div className="dark min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-lilou-secondary/10 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.3),rgba(255,255,255,0))]"></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
             <Link to="/" className="inline-block mb-4">
                <motion.h1 
                  className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                  initial={{ backgroundSize: '200% auto', backgroundPosition: '0% center' }}
                  animate={{ backgroundPosition: ['0% center', '200% center', '0% center'] }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                >
                  Lilou-GO
                </motion.h1>
            </Link>
            <p className="text-lg text-text-secondary font-medium">
              Pilotez votre logistique vers l'excellence.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full">
            <AuthForm />
          </motion.div>

           <motion.div variants={itemVariants} className="mt-6 text-center text-sm">
             <p className="text-text-secondary">
                Besoin d'aide ? <Link to="/recrutement" className="underline hover:text-primary transition-colors">Contactez le support</Link>.
             </p>
           </motion.div>
        </motion.div>
      </div>
    </>
  );
}