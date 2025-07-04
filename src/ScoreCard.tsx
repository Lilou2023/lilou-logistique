import React, { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchScoreData } from './api/mockApi'
import { Score } from './types'

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '➡️'
    }
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
          <div key={score.id} className="score-item card">
            <div className="score-header">
              <h3>{score.metric}</h3>
              <span className="trend-icon">{getTrendIcon(score.trend)}</span>
            </div>
            
            <div className="score-value" style={{ color: getScoreColor(score.score) }}>
              {score.score}%
            </div>
            
            <div className="score-trend">
              Tendance: <span className={`trend-${score.trend}`}>{score.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

ScoreCard.displayName = 'ScoreCard'

export default ScoreCard