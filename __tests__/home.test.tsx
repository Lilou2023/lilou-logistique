import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home page', () => {
  it('renders main heading', () => {
    render(<Home />)
    expect(screen.getByText('🚚 Lilou Logistique')).toBeInTheDocument()
  })
})
