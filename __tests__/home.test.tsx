import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home page', () => {
  it('renders main heading', () => {
    render(<Home />)
    expect(screen.getByText('🚚 Lilou Logistique')).toBeInTheDocument()
  })

  it('displays feature sections', () => {
    render(<Home />)
    expect(screen.getByText('🔐 Sécurisé')).toBeInTheDocument()
    expect(screen.getByText('⚡ Temps Réel')).toBeInTheDocument()
    expect(screen.getByText('🤖 Intelligent')).toBeInTheDocument()
  })
})
