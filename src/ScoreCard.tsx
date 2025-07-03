import React, { memo } from 'react'
import { useQuery } from '@tanstack/react-query'

interface ScoreData {
  driverId: string
  driverName: string
  efficiency: number
  punctuality: number
  customerRating: number
  totalScore: number
  deliveriesCompleted: number
  fuelEfficiency: number
}

const fetchScoreData = async (): Promise<ScoreData[]> => {
  const response = await fetch('/api/scores')
  if (!response.ok) throw new Error('Failed to fetch score data')
  return response.json()
}

const ScoreCard = memo(() => {
  const { data: scores = [], isLoading, error } = useQuery({
    queryKey: ['scores'],
    queryFn: fetchScoreData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50' // Green
    if (score >= 75) return '#FF9800' // Orange
    return '#F44336' // Red
  }

  if (isLoading) {
    return (
      <div className="score-card-loading">
        <div className="loading-spinner" />
        <p>Chargement des scores...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="score-card-error">
        <p>Erreur lors du chargement des scores</p>
      </div>
    )
  }

  return (
    <div className="score-card">
      <h2>Tableau de Bord des Performances</h2>
      
      <div className="scores-grid">
        {scores.map((score) => (
          <div key={score.driverId} className="score-item">
            <div className="driver-info">
              <h3>{score.driverName}</h3>
              <div className="total-score" style={{ color: getScoreColor(score.totalScore) }}>
                {score.totalScore}/100
              </div>
            </div>
            
            <div className="score-details">
              <div className="metric">
                <span className="label">Efficacité:</span>
                <span className="value">{score.efficiency}%</span>
              </div>
              <div className="metric">
                <span className="label">Ponctualité:</span>
                <span className="value">{score.punctuality}%</span>
              </div>
              <div className="metric">
                <span className="label">Note Client:</span>
                <span className="value">⭐ {score.customerRating.toFixed(1)}</span>
              </div>
              <div className="metric">
                <span className="label">Livraisons:</span>
                <span className="value">{score.deliveriesCompleted}</span>
              </div>
              <div className="metric">
                <span className="label">Consommation:</span>
                <span className="value">{score.fuelEfficiency.toFixed(1)} L/100km</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

ScoreCard.displayName = 'ScoreCard'

export default ScoreCard