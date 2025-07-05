import { useState, useEffect } from 'react'

export function useAmirScore() {
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Placeholder logic to fetch Amir bot score
    setScore(42)
  }, [])

  return score
}

export default useAmirScore
