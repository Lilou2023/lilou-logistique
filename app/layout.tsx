import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lilou Logistique - Gestion Logistique Intelligente',
  description: 'Plateforme de gestion logistique connectée avec Supabase et OpenAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}