// Types pour l'application Lilou Logistique

export interface Driver {
  id: string
  name: string
  status: 'active' | 'inactive' | 'on-break'
  vehicle: string
  currentLocation: string
  deliveries: number
  rating: number
}

export interface Vehicle {
  id: string
  licensePlate: string
  model: string
  status: 'available' | 'in-use' | 'maintenance' | 'out-of-service'
  capacity: number
  fuelLevel: number
  lastMaintenance: string
  driver: string | null
}

export interface Location {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  type: 'warehouse' | 'delivery' | 'pickup' | 'depot'
}

export interface Delivery {
  id: string
  driverId: string
  vehicleId: string
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  pickupLocation: string
  deliveryLocation: string
  scheduledAt: string
  pickedUpAt?: string
  deliveredAt?: string
  customerName: string
  customerPhone?: string
  notes?: string
}

export interface Score {
  id: string
  metric: string
  score: number
  trend: 'up' | 'down' | 'stable'
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
}

export interface DashboardData {
  totalDrivers: number
  activeVehicles: number
  todayDeliveries: number
  recentActivities: Activity[]
}

export interface PerformanceMetric {
  id: string
  driverId: string
  date: string
  deliveriesCompleted: number
  averageDeliveryTime: number
  fuelEfficiency: number
  customerRating: number
  onTimePercentage: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'driver'
  permissions: string[]
}