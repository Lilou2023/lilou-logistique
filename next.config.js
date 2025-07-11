/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuration pour Vercel (pas d'export statique)
  // output: 'export', // ← Décommentez cette ligne uniquement pour le déploiement statique (Hostinger). Laissez-la commentée pour Vercel.
  trailingSlash: false, // Changé à false pour Vercel
  
  // Configuration des images
  images: {
    unoptimized: false, // Changé à false pour Vercel
    domains: [
      'localhost',
      // Ajoutez ici les domaines autorisés pour les images
    ],
  },

  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_APP_NAME: 'Lilou Logistique',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig