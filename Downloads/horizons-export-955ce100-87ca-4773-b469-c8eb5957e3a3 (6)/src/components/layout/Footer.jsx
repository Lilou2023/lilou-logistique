import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-card text-card-foreground py-6 px-4 md:px-6 lg:px-8 border-t border-border mt-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-lg text-primary-foreground mb-2">SAS Lilou Logistique</p>
          <p>SIREN : 892 230 269</p>
          <p>Forme Juridique : Société par Actions Simplifiée (SAS)</p>
          <p>Siège Social : 7 Rue Etienne Oehmichen, 51100 Reims</p>
          <p>Siège Secondaire : 38 Route des Combes, 06200 Nice</p>
          <p>Immatriculation : RCS Reims</p>
        </div>
        <div className="text-lg font-bold text-primary-foreground">
          "Votre journée commence ici, livrez avec passion et efficacité !"
        </div>
      </div>
    </motion.footer>
  );
}