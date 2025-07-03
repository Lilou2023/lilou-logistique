module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        'categories:pwa': ['error', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        
        // Bundle size
        'total-byte-weight': ['error', { maxNumericValue: 1000000 }], // 1MB
        'unused-javascript': ['error', { maxNumericValue: 100000 }], // 100KB
        
        // Render blocking resources
        'render-blocking-resources': ['error', { maxNumericValue: 0 }],
        'unminified-css': ['error', { maxNumericValue: 0 }],
        'unminified-javascript': ['error', { maxNumericValue: 0 }],
        
        // Images
        'modern-image-formats': ['error', { minScore: 0.8 }],
        'offscreen-images': ['error', { maxNumericValue: 100000 }],
        'uses-responsive-images': ['error', { minScore: 0.8 }],
        
        // Network
        'uses-http2': ['error', { minScore: 1 }],
        'uses-text-compression': ['error', { minScore: 1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}