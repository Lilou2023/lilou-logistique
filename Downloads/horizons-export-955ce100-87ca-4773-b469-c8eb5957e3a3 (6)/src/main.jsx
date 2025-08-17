import React from 'react';
import ReactDOM from 'react-dom/client';
import WrappedApp from '@/App';
import '@/index.css';
import { AppProviders } from '@/contexts/AppProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <WrappedApp />
    </AppProviders>
  </React.StrictMode>
);