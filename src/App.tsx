import React, { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { App as CapacitorApp } from '@capacitor/app'

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./dashboard'))
const DriverTable = React.lazy(() => import('./DriverTable'))
const VehiclePanel = React.lazy(() => import('./VehiclePanel'))
const ScoreCard = React.lazy(() => import('./ScoreCard'))
const AmirBot = React.lazy(() => import('./AmirBot'))

// Loading component for route transitions
const RouteLoading = () => (
  <div className="route-loading">
    <div className="spinner" />
  </div>
)

function App() {
  useEffect(() => {
    // Capacitor app lifecycle management
    CapacitorApp.addListener('appStateChange', (state) => {
      if (state.isActive) {
        // App became active - resume operations
        console.log('App resumed')
      } else {
        // App went to background - pause heavy operations
        console.log('App paused')
      }
    })

    // Cleanup listener on unmount
    return () => {
      CapacitorApp.removeAllListeners()
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lilou Logistique</h1>
      </header>
      
      <main className="app-main">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drivers" element={<DriverTable />} />
            <Route path="/vehicles" element={<VehiclePanel />} />
            <Route path="/scores" element={<ScoreCard />} />
            <Route path="/bot" element={<AmirBot />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
