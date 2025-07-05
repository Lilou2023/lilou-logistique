import { memo, useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

interface Vehicle {
  id: string
  licensePlate: string
  model: string
  status: 'available' | 'in-use' | 'maintenance' | 'out-of-service'
  currentLocation: string
  fuelLevel: number
  lastMaintenance: string
  driverId?: string
  driverName?: string
}

const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await fetch('/api/vehicles')
  if (!response.ok) throw new Error('Failed to fetch vehicles')
  return response.json()
}

const VehiclePanel = memo(() => {
  const [statusFilter, setStatusFilter] = useState('')
  
  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => 
      !statusFilter || vehicle.status === statusFilter
    )
  }, [vehicles, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#4CAF50'
      case 'in-use': return '#2196F3'
      case 'maintenance': return '#FF9800'
      case 'out-of-service': return '#F44336'
      default: return '#757575'
    }
  }

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return '#4CAF50'
    if (level > 25) return '#FF9800'
    return '#F44336'
  }

  if (isLoading) {
    return (
      <div className="vehicle-panel-loading">
        <div className="loading-spinner" />
        <p>Chargement des véhicules...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="vehicle-panel-error">
        <p>Erreur lors du chargement des véhicules</p>
      </div>
    )
  }

  return (
    <div className="vehicle-panel">
      <div className="vehicle-panel-header">
        <h2>Gestion des Véhicules</h2>
        <div className="vehicle-count">
          {filteredVehicles.length} véhicules
        </div>
      </div>

      <div className="vehicle-filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="">Tous les statuts</option>
          <option value="available">Disponible</option>
          <option value="in-use">En service</option>
          <option value="maintenance">Maintenance</option>
          <option value="out-of-service">Hors service</option>
        </select>
      </div>

      <div className="vehicles-grid">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <div className="vehicle-header">
              <h3>{vehicle.licensePlate}</h3>
              <div 
                className="vehicle-status"
                style={{ color: getStatusColor(vehicle.status) }}
              >
                {vehicle.status}
              </div>
            </div>
            
            <div className="vehicle-details">
              <div className="detail-item">
                <span className="label">Modèle:</span>
                <span className="value">{vehicle.model}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Position:</span>
                <span className="value">{vehicle.currentLocation}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Carburant:</span>
                <span 
                  className="value"
                  style={{ color: getFuelLevelColor(vehicle.fuelLevel) }}
                >
                  {vehicle.fuelLevel}%
                </span>
              </div>
              
              <div className="detail-item">
                <span className="label">Dernière maintenance:</span>
                <span className="value">
                  {new Date(vehicle.lastMaintenance).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              {vehicle.driverName && (
                <div className="detail-item">
                  <span className="label">Conducteur:</span>
                  <span className="value">{vehicle.driverName}</span>
                </div>
              )}
            </div>
            
            <div className="fuel-bar">
              <div 
                className="fuel-level"
                style={{ 
                  width: `${vehicle.fuelLevel}%`,
                  backgroundColor: getFuelLevelColor(vehicle.fuelLevel)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

VehiclePanel.displayName = 'VehiclePanel'

export default VehiclePanel