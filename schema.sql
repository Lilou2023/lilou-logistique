-- Optimized Database Schema for Lilou Logistique
-- Performance-focused design with proper indexing

-- Drivers table with performance optimizations
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'inactive',
    vehicle_id UUID,
    current_location_id UUID,
    phone VARCHAR(20),
    license_number VARCHAR(50) UNIQUE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_deliveries INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT drivers_status_check CHECK (status IN ('active', 'inactive', 'on-break', 'suspended')),
    CONSTRAINT drivers_rating_check CHECK (rating >= 0 AND rating <= 5)
);

-- Vehicles table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    model VARCHAR(100) NOT NULL,
    capacity_kg INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    current_location_id UUID,
    fuel_level DECIMAL(5,2),
    last_maintenance DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT vehicles_status_check CHECK (status IN ('available', 'in-use', 'maintenance', 'out-of-service')),
    CONSTRAINT vehicles_fuel_check CHECK (fuel_level >= 0 AND fuel_level <= 100)
);

-- Locations table for GPS coordinates
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    address TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    type VARCHAR(50) DEFAULT 'delivery',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT locations_type_check CHECK (type IN ('warehouse', 'delivery', 'pickup', 'depot'))
);

-- Deliveries table
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    pickup_location_id UUID NOT NULL,
    delivery_location_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    priority VARCHAR(10) DEFAULT 'normal',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    picked_up_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    estimated_duration INTEGER, -- in minutes
    actual_duration INTEGER, -- in minutes
    distance_km DECIMAL(10, 2),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT deliveries_status_check CHECK (status IN ('pending', 'assigned', 'picked-up', 'in-transit', 'delivered', 'cancelled')),
    CONSTRAINT deliveries_priority_check CHECK (priority IN ('low', 'normal', 'high', 'urgent'))
);

-- Performance tracking table
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL,
    date DATE NOT NULL,
    deliveries_completed INTEGER DEFAULT 0,
    average_delivery_time INTEGER, -- in minutes
    fuel_efficiency DECIMAL(5, 2), -- km per liter
    customer_rating DECIMAL(3, 2),
    on_time_percentage DECIMAL(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(driver_id, date)
);

-- Activity log for audit trail
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    user_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PERFORMANCE INDEXES
-- Critical indexes for query performance

-- Drivers indexes
CREATE INDEX idx_drivers_status ON drivers(status) WHERE status IN ('active', 'on-break');
CREATE INDEX idx_drivers_vehicle ON drivers(vehicle_id) WHERE vehicle_id IS NOT NULL;
CREATE INDEX idx_drivers_location ON drivers(current_location_id) WHERE current_location_id IS NOT NULL;
CREATE INDEX idx_drivers_created_at ON drivers(created_at);
CREATE INDEX idx_drivers_rating ON drivers(rating DESC);

-- Vehicles indexes
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_location ON vehicles(current_location_id);
CREATE INDEX idx_vehicles_maintenance ON vehicles(last_maintenance);

-- Locations indexes
CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);
CREATE INDEX idx_locations_type ON locations(type);

-- Deliveries indexes (most critical for performance)
CREATE INDEX idx_deliveries_driver_status ON deliveries(driver_id, status);
CREATE INDEX idx_deliveries_vehicle_status ON deliveries(vehicle_id, status);
CREATE INDEX idx_deliveries_status_scheduled ON deliveries(status, scheduled_at);
CREATE INDEX idx_deliveries_created_at ON deliveries(created_at);
CREATE INDEX idx_deliveries_priority_status ON deliveries(priority, status);
CREATE INDEX idx_deliveries_date_range ON deliveries(scheduled_at) WHERE scheduled_at >= CURRENT_DATE;

-- Performance metrics indexes
CREATE INDEX idx_performance_driver_date ON performance_metrics(driver_id, date DESC);
CREATE INDEX idx_performance_date ON performance_metrics(date DESC);

-- Activity logs indexes
CREATE INDEX idx_activity_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_created_at ON activity_logs(created_at DESC);
CREATE INDEX idx_activity_user ON activity_logs(user_id) WHERE user_id IS NOT NULL;

-- FOREIGN KEY CONSTRAINTS
ALTER TABLE drivers ADD CONSTRAINT fk_drivers_vehicle 
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL;

ALTER TABLE drivers ADD CONSTRAINT fk_drivers_location 
    FOREIGN KEY (current_location_id) REFERENCES locations(id) ON DELETE SET NULL;

ALTER TABLE vehicles ADD CONSTRAINT fk_vehicles_location 
    FOREIGN KEY (current_location_id) REFERENCES locations(id) ON DELETE SET NULL;

ALTER TABLE deliveries ADD CONSTRAINT fk_deliveries_driver 
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE;

ALTER TABLE deliveries ADD CONSTRAINT fk_deliveries_vehicle 
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE;

ALTER TABLE deliveries ADD CONSTRAINT fk_deliveries_pickup 
    FOREIGN KEY (pickup_location_id) REFERENCES locations(id) ON DELETE CASCADE;

ALTER TABLE deliveries ADD CONSTRAINT fk_deliveries_delivery 
    FOREIGN KEY (delivery_location_id) REFERENCES locations(id) ON DELETE CASCADE;

ALTER TABLE performance_metrics ADD CONSTRAINT fk_performance_driver 
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE;

-- TRIGGERS FOR AUTOMATIC UPDATES
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- VIEWS FOR COMMON QUERIES
CREATE VIEW active_drivers_view AS
SELECT 
    d.id,
    d.name,
    d.status,
    d.rating,
    d.total_deliveries,
    v.license_plate,
    v.model as vehicle_model,
    l.name as current_location
FROM drivers d
LEFT JOIN vehicles v ON d.vehicle_id = v.id
LEFT JOIN locations l ON d.current_location_id = l.id
WHERE d.status IN ('active', 'on-break');

CREATE VIEW today_deliveries_view AS
SELECT 
    d.id,
    d.status,
    d.priority,
    d.scheduled_at,
    dr.name as driver_name,
    v.license_plate,
    pickup.name as pickup_location,
    delivery.name as delivery_location,
    d.customer_name
FROM deliveries d
JOIN drivers dr ON d.driver_id = dr.id
JOIN vehicles v ON d.vehicle_id = v.id
JOIN locations pickup ON d.pickup_location_id = pickup.id
JOIN locations delivery ON d.delivery_location_id = delivery.id
WHERE DATE(d.scheduled_at) = CURRENT_DATE;

-- PERFORMANCE MONITORING
-- Function to analyze query performance
CREATE OR REPLACE FUNCTION analyze_query_performance()
RETURNS TABLE(
    query_text TEXT,
    calls BIGINT,
    total_time DOUBLE PRECISION,
    avg_time DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pg_stat_statements.query,
        pg_stat_statements.calls,
        pg_stat_statements.total_time,
        pg_stat_statements.mean_time
    FROM pg_stat_statements
    ORDER BY pg_stat_statements.mean_time DESC
    LIMIT 20;
END;
$$ LANGUAGE plpgsql;