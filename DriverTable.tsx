import React, { memo, useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// Types
interface Driver {
  id: string
  name: string
  status: 'active' | 'inactive' | 'on-break'
  vehicle: string
  currentLocation: string
  deliveries: number
  rating: number
}

// API function
const fetchDrivers = async (): Promise<Driver[]> => {
  const response = await fetch('/api/drivers')
  if (!response.ok) throw new Error('Failed to fetch drivers')
  return response.json()
}

// Memoized filter component
const FilterControls = memo(({ 
  statusFilter, 
  onStatusChange, 
  searchTerm, 
  onSearchChange 
}: {
  statusFilter: string
  onStatusChange: (status: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}) => (
  <div className="filter-controls">
    <input
      type="text"
      placeholder="Search drivers..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
    <select
      value={statusFilter}
      onChange={(e) => onStatusChange(e.target.value)}
      className="status-filter"
    >
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="on-break">On Break</option>
    </select>
  </div>
))

FilterControls.displayName = 'FilterControls'

// Virtualized driver row component
const DriverRow = memo(({ index, style, data }: {
  index: number
  style: React.CSSProperties
  data: Driver[]
}) => {
  const driver = data[index]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50'
      case 'inactive': return '#F44336'
      case 'on-break': return '#FF9800'
      default: return '#757575'
    }
  }

  return (
    <div style={style} className="driver-row">
      <div className="driver-info">
        <div className="driver-name">{driver.name}</div>
        <div 
          className="driver-status"
          style={{ color: getStatusColor(driver.status) }}
        >
          {driver.status}
        </div>
      </div>
      <div className="driver-vehicle">{driver.vehicle}</div>
      <div className="driver-location">{driver.currentLocation}</div>
      <div className="driver-deliveries">{driver.deliveries}</div>
      <div className="driver-rating">
        ⭐ {driver.rating.toFixed(1)}
      </div>
    </div>
  )
})

DriverRow.displayName = 'DriverRow'

const DriverTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch drivers data
  const { data: drivers = [], isLoading, error } = useQuery({
    queryKey: ['drivers'],
    queryFn: fetchDrivers,
    staleTime: 1 * 60 * 1000, // 1 minute
  })

  // Memoized filtered drivers
  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const matchesStatus = !statusFilter || driver.status === statusFilter
      const matchesSearch = !searchTerm || 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesStatus && matchesSearch
    })
  }, [drivers, statusFilter, searchTerm])

  // Optimized callbacks
  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status)
  }, [])

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  if (isLoading) {
    return (
      <div className="driver-table-loading">
        <div className="loading-spinner" />
        <p>Loading drivers...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="driver-table-error">
        <p>Error loading drivers</p>
      </div>
    )
  }

  return (
    <div className="driver-table">
      <div className="driver-table-header">
        <h2>Driver Management</h2>
        <div className="driver-count">
          {filteredDrivers.length} of {drivers.length} drivers
        </div>
      </div>

      <FilterControls
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Table Headers */}
      <div className="table-headers">
        <div className="header-cell">Driver</div>
        <div className="header-cell">Vehicle</div>
        <div className="header-cell">Location</div>
        <div className="header-cell">Deliveries</div>
        <div className="header-cell">Rating</div>
      </div>

      {/* Virtualized Table Body */}
      <div className="table-body" style={{ height: '500px' }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={filteredDrivers.length}
              itemSize={60}
              itemData={filteredDrivers}
            >
              {DriverRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default memo(DriverTable)