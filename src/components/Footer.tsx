import React from 'react';
import { useAppConfig } from '../hooks/useAppConfig';

const Footer: React.FC = () => {
  const { name, version, url, isDevelopment } = useAppConfig();

  return (
    <footer className="w-full text-center text-sm text-gray-500 py-4 border-t bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <span className="font-medium text-gray-700">{name}</span>
            <span className="text-gray-400 ml-2">v{version}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {url.replace('https://', '')}
            </a>
            
            {isDevelopment && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                DEV
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          © 2024 {name}. Système de gestion logistique intelligent.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
