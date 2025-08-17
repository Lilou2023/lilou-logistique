export const KPI_THRESHOLDS = {
  DNR_RATE: { optimal: 3, watch: 5, isHigherBetter: false },
  POD_QUALITY_RATE: { optimal: 98, watch: 95, isHigherBetter: true },
  FALSE_SCAN_RATE: { optimal: 0.1, watch: 0.3, isHigherBetter: false },
  FDPS_RATE: { optimal: 95, watch: 90, isHigherBetter: true },
  CONTACT_COMPLIANCE: { optimal: 99, watch: 98, isHigherBetter: true },
  CUSTOMER_ESCALATIONS: { optimal: 0, watch: 2, isHigherBetter: false },
  OVERALL_DSP_SCORE: { optimal: 90, watch: 80, isHigherBetter: true },
  AMAZON_COMPLIANCE_RATE: { optimal: 98, watch: 95, isHigherBetter: true },
};

export const getKpiStatus = (kpiName, value) => {
  const thresholds = KPI_THRESHOLDS[kpiName];
  if (!thresholds || value === undefined || value === null) return 'default';

  const { optimal, watch, isHigherBetter } = thresholds;

  if (isHigherBetter) {
    if (value >= optimal) return 'optimal';
    if (value >= watch) return 'watch';
    return 'critical';
  } else {
    if (value <= optimal) return 'optimal';
    if (value <= watch) return 'watch';
    return 'critical';
  }
};