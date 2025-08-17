import React from 'react';
    import VehicleCheckForm from '@/components/driver/VehicleCheckForm';
    import MobilicConnect from './MobilicConnect';
    
    const DepartTab = ({ driverInfo, morningCheck, refreshChecks }) => {
      return (
        <div className="space-y-6">
          <MobilicConnect />
          <VehicleCheckForm 
            checkType="morning" 
            driverInfo={driverInfo}
            onCheckComplete={refreshChecks}
            existingCheck={morningCheck}
          />
        </div>
      );
    };
    
    export default DepartTab;