import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // ⚡ Métadonnées générales
  title: 'Lilou Logistique v5.1 - Plateforme DSP Expert',
  description: 'Plateforme DSP ultra-performante avec IA et optimisation génétique pour les livraisons.',
  keywords: [
    'DSP', 
    'logistique', 
    'intelligence artificielle', 
    'livraison', 
    'optimisation',
    'Amazon DSP',
    'AMIR',
    'scoring',
    'dernier kilomètre'
  ],
  authors: [{ name: 'Lilou Logistique' }],
  creator: 'Lilou Logistique',
  publisher: 'Lilou Logistique',
  
  // 🌐 URLs et canonical
  metadataBase: new URL('https://lilou-logistique.com'),
  alternates: {
    canonical: '/',
  },

  // ✅ Open Graph (Facebook, LinkedIn, WhatsApp...)
  openGraph: {
    type: 'website',
    siteName: 'Lilou Logistique',
    title: 'Lilou Logistique v5.1 - Plateforme DSP Expert',
    description: 'Plateforme DSP ultra-performante avec IA, scores AMIR et suivi temps réel.',
    url: 'https://lilou-logistique.com',
    images: [
      {
        url: '/assets/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Lilou Logistique - Plateforme DSP Expert',
      },
    ],
    locale: 'fr_FR',
  },

  // ✅ Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@lilou_logistique',
    creator: '@lilou_logistique',
    title: 'Lilou Logistique - Suivi IA, Analyse, Dispatching Pro',
    description: 'Améliorez vos livraisons avec notre plateforme intelligente DSP 100% française.',
    images: ['/assets/twitter-cover.jpg'],
  },

  // 🤖 SEO avancé
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 📱 App metadata
  applicationName: 'Lilou Logistique',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lilou Logistique',
  },

  // 🔗 Additional metadata
  other: {
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  // 📱 Mobile optimization
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  
  // 🎨 Theme colors
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E40AF' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
} 