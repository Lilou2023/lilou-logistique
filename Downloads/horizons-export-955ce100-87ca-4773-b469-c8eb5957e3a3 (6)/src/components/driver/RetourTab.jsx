import React from 'react';
import VehicleCheckForm from '@/components/driver/VehicleCheckForm';

const RetourTab = ({ driverInfo, eveningCheck, refreshChecks }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">Routine de Retour</h2>
      <VehicleCheckForm
        checkType="evening"
        driverInfo={driverInfo}
        onCheckComplete={refreshChecks}
        existingCheck={eveningCheck}
      />
    </div>
  );
};

export default RetourTab;