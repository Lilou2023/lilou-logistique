/**
 * @jest-environment node
 */
import { renderToStaticMarkup } from 'react-dom/server'
import RootLayout from '../app/layout'

describe('RootLayout', () => {
  it('renders children and html structure', () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <div data-testid="child" />
      </RootLayout>
    )
    expect(markup).toContain('data-testid="child"')
    expect(markup).toContain('<html lang="fr"')
  })
})
