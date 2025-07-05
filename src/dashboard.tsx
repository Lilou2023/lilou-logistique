import React, { memo, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// Types
interface DashboardData {
  totalDrivers: number
  activeVehicles: number
  todayDeliveries: number
  recentActivities: Activity[]
}

interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
}

// API functions
const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch('/api/dashboard')
  if (!response.ok) throw new Error('Failed to fetch dashboard data')
  return response.json()
}

// Memoized components for better performance
const StatCard = memo(({ title, value, icon }: {
  title: string
  value: number
  icon: string
}) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3>{title}</h3>
      <p className="stat-value">{value.toLocaleString()}</p>
    </div>
  </div>
))

StatCard.displayName = 'StatCard'

// Virtualized list item for activities
const ActivityItem = memo(({ index, style, data }: {
  index: number
  style: React.CSSProperties
  data: Activity[]
}) => {
  const activity = data[index]
  
  return (
    <div style={style} className="activity-item">
      <div className="activity-type">{activity.type}</div>
      <div className="activity-description">{activity.description}</div>
      <div className="activity-time">
        {new Date(activity.timestamp).toLocaleTimeString()}
      </div>
    </div>
  )
})

ActivityItem.displayName = 'ActivityItem'

const Dashboard: React.FC = () => {
  // Optimized data fetching with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  })

  // Memoized stats calculation
  const stats = useMemo(() => {
    if (!data) return []
    
    return [
      { title: 'Total Drivers', value: data.totalDrivers, icon: '👥' },
      { title: 'Active Vehicles', value: data.activeVehicles, icon: '🚛' },
      { title: 'Today Deliveries', value: data.todayDeliveries, icon: '📦' },
    ]
  }, [data])

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error loading dashboard data</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Activities with Virtualization */}
      <div className="activities-section">
        <h3>Recent Activities</h3>
        <div className="activities-container" style={{ height: '400px' }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                itemCount={data?.recentActivities.length || 0}
                itemSize={80}
                itemData={data?.recentActivities || []}
              >
                {ActivityItem}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)
