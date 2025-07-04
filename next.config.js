/** @type {import('next').NextConfig} */
const nextConfig = {
  // For static export compatibility with Vercel
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Set base path if needed
  basePath: '',
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // Asset prefix for CDN
  assetPrefix: '',
  
  // Redirect configuration
  async redirects() {
    return []
  },
  
  // Rewrite configuration
  async rewrites() {
    return []
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig