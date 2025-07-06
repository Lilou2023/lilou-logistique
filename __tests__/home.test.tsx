import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home page', () => {
  it('renders basic text', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /Lilou Logistique/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Plateforme de gestion logistique/i)
    ).toBeInTheDocument()
  })
})
