import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Capacitor } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'
import { StatusBar, Style } from '@capacitor/status-bar'
import './index.css'

// Lazy load main app component
const App = React.lazy(() => import('./App'))

// Configure React Query for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// PWA Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered:', registration))
      .catch(error => console.log('SW registration failed:', error))
  })
}

// Capacitor initialization
if (Capacitor.isNativePlatform()) {
  // Hide splash screen
  CapacitorApp.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active:', isActive)
  })
  
  // Configure status bar
  if (Capacitor.getPlatform() === 'ios') {
    StatusBar.setStyle({ style: Style.Light }).catch(() => {})
  }
}

// Loading component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner" />
    <p>Loading Lilou Logistique...</p>
  </div>
)

// Mount the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)