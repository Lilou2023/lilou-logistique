/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuration pour l'export statique
  output: 'export',
  trailingSlash: true,
  
  // Configuration des images
  images: {
    unoptimized: true,
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