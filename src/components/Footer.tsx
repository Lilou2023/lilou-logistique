import React from 'react';
import { useAppConfig } from '../hooks/useAppConfig';

const Footer: React.FC = () => {
  const { name, version, url } = useAppConfig();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-300 text-sm">
              Système de gestion logistique intelligent
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="text-sm text-gray-300 mb-2">
              Version {version}
            </div>
            <div className="text-xs text-gray-400">
              © 2024 {name}. Tous droits réservés.
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-yellow-400 mt-1">
                Mode développement
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-4 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <div>
              <span>URL: </span>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200"
              >
                {url}
              </a>
            </div>
            <div className="mt-2 md:mt-0">
              <span>Build: </span>
              <span className="font-mono">{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 