import React from 'react';

interface AppInfoProps {
  showVersion?: boolean;
  showUrl?: boolean;
  className?: string;
}

const AppInfo: React.FC<AppInfoProps> = ({ 
  showVersion = true, 
  showUrl = false, 
  className = '' 
}) => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Lilou Logistique DSP';
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lilou-logistique.com';

  return (
    <div className={`app-info ${className}`}>
      <span className="app-name">{appName}</span>
      {showVersion && (
        <span className="app-version">v{appVersion}</span>
      )}
      {showUrl && (
        <span className="app-url">{appUrl}</span>
      )}
    </div>
  );
};

export default AppInfo; 
