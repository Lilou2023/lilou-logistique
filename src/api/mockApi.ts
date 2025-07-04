// Mock API pour le développement
// En production, remplacer par de vraies API

import { Driver, Vehicle, Delivery, Score, DashboardData, Activity } from '../types'

// Données mock
const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    status: 'active',
    vehicle: 'Camion #001',
    currentLocation: 'Entrepôt Central',
    deliveries: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Marie Martin',
    status: 'active',
    vehicle: 'Camion #002',
    currentLocation: 'Route - Paris',
    deliveries: 12,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Pierre Bernard',
    status: 'on-break',
    vehicle: 'Camion #003',
    currentLocation: 'Station Service',
    deliveries: 8,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Sophie Leroy',
    status: 'inactive',
    vehicle: 'Camion #004',
    currentLocation: 'Entrepôt Nord',
    deliveries: 20,
    rating: 4.7
  }
]

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    licensePlate: 'AB-123-CD',
    model: 'Mercedes Sprinter',
    status: 'in-use',
    capacity: 1500,
    fuelLevel: 75,
    lastMaintenance: '2024-01-15',
    driver: 'Jean Dupont'
  },
  {
    id: '2',
    licensePlate: 'EF-456-GH',
    model: 'Iveco Daily',
    status: 'in-use',
    capacity: 2000,
    fuelLevel: 60,
    lastMaintenance: '2024-01-20',
    driver: 'Marie Martin'
  },
  {
    id: '3',
    licensePlate: 'IJ-789-KL',
    model: 'Renault Master',
    status: 'available',
    capacity: 1800,
    fuelLevel: 90,
    lastMaintenance: '2024-01-10',
    driver: null
  },
  {
    id: '4',
    licensePlate: 'MN-012-OP',
    model: 'Peugeot Boxer',
    status: 'maintenance',
    capacity: 1600,
    fuelLevel: 40,
    lastMaintenance: '2023-12-20',
    driver: null
  }
]

const mockScores: Score[] = [
  { id: '1', metric: 'Livraisons à temps', score: 92, trend: 'up' },
  { id: '2', metric: 'Satisfaction client', score: 88, trend: 'stable' },
  { id: '3', metric: 'Efficacité carburant', score: 76, trend: 'down' },
  { id: '4', metric: 'Sécurité routière', score: 95, trend: 'up' }
]

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'Livraison',
    description: 'Livraison complétée - Client Dupont SA',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'Maintenance',
    description: 'Maintenance planifiée - Camion #004',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    type: 'Alerte',
    description: 'Niveau carburant bas - Camion #002',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
]

// Simuler une latence réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// API Functions
export const api = {
  async getDashboard(): Promise<DashboardData> {
    await delay(300)
    return {
      totalDrivers: mockDrivers.length,
      activeVehicles: mockVehicles.filter(v => v.status === 'in-use').length,
      todayDeliveries: Math.floor(Math.random() * 30) + 20,
      recentActivities: mockActivities
    }
  },

  async getDrivers(): Promise<Driver[]> {
    await delay(200)
    return mockDrivers
  },

  async getVehicles(): Promise<Vehicle[]> {
    await delay(200)
    return mockVehicles
  },

  async getScores(): Promise<Score[]> {
    await delay(200)
    return mockScores
  },

  async getDeliveries(): Promise<Delivery[]> {
    await delay(300)
    // Générer des livraisons mock
    return Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      driverId: mockDrivers[i % mockDrivers.length].id,
      vehicleId: mockVehicles[i % mockVehicles.length].id,
      status: ['pending', 'in-transit', 'delivered'][i % 3] as any,
      pickupLocation: 'Entrepôt Central',
      deliveryLocation: `Client ${i + 1}`,
      scheduledAt: new Date(Date.now() + i * 3600000).toISOString(),
      customerName: `Client ${i + 1}`,
      priority: ['normal', 'high', 'urgent'][i % 3] as any
    }))
  }
}

// Export des fonctions individuelles pour les composants
export const fetchDashboardData = () => api.getDashboard()
export const fetchDrivers = () => api.getDrivers()
export const fetchVehicles = () => api.getVehicles()
export const fetchScoreData = () => api.getScores()
export const fetchDeliveries = () => api.getDeliveries()