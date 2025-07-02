/**
 * 🚀 LILOU LOGISTIQUE - Deployment Configuration
 * Central configuration for all deployment targets and environments
 */

const deployConfig = {
  // Application information
  app: {
    name: 'lilou-logistique',
    version: process.env.npm_package_version || '1.0.0',
    description: 'Plateforme logistique intelligente et connectée'
  },

  // Environment configurations
  environments: {
    development: {
      name: 'development',
      branch: 'develop',
      domain: 'localhost:3000',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      buildCommand: 'npm run build',
      testCommand: 'npm run test'
    },
    staging: {
      name: 'staging',
      branch: 'develop',
      domain: process.env.STAGING_DOMAIN || 'staging.lilou-logistique.com',
      apiUrl: process.env.STAGING_API_URL || 'https://staging.lilou-logistique.com/api',
      supabaseUrl: process.env.STAGING_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
      buildCommand: 'npm run build',
      testCommand: 'npm run test'
    },
    production: {
      name: 'production',
      branch: 'main',
      domain: process.env.PRODUCTION_DOMAIN || 'lilou-logistique.com',
      apiUrl: process.env.PRODUCTION_API_URL || 'https://lilou-logistique.com/api',
      supabaseUrl: process.env.PROD_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
      buildCommand: 'npm run build',
      testCommand: 'npm run test'
    }
  },

  // Platform configurations
  platforms: {
    vercel: {
      name: 'Vercel',
      buildCommand: 'npm run build',
      outputDirectory: '.next',
      installCommand: 'npm ci',
      framework: 'nextjs',
      regions: ['cdg1', 'iad1'], // Paris and Virginia
      functions: {
        maxDuration: 30
      },
      headers: [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            }
          ]
        }
      ]
    },
    netlify: {
      name: 'Netlify',
      buildCommand: 'npm run build && npm run export',
      outputDirectory: 'out',
      installCommand: 'npm ci',
      functions: './netlify/functions',
      redirects: [
        {
          from: '/api/*',
          to: '/.netlify/functions/:splat',
          status: 200
        }
      ],
      headers: [
        {
          for: '/*',
          values: {
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
          }
        }
      ]
    },
    aws: {
      name: 'AWS',
      buildCommand: 'npm run build && npm run export',
      outputDirectory: 'out',
      installCommand: 'npm ci',
      s3: {
        bucketPrefix: 'lilou-logistique',
        region: 'eu-west-1',
        acl: 'public-read'
      },
      cloudfront: {
        priceClass: 'PriceClass_100', // Use only North America and Europe
        cacheBehaviors: [
          {
            pathPattern: '/api/*',
            cachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad', // CachingDisabled
            compress: true
          },
          {
            pathPattern: '/_next/static/*',
            cachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6', // CachingOptimized
            compress: true
          }
        ]
      }
    }
  },

  // Build configurations
  build: {
    nodeVersion: '20',
    commands: {
      preInstall: [],
      postInstall: ['npm run validate-env'],
      preBuild: ['npm run type-check'],
      postBuild: [],
      preTest: [],
      postTest: []
    },
    env: {
      NODE_ENV: 'production',
      FORCE_COLOR: '1'
    }
  },

  // Security configurations
  security: {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    csp: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'", 'https://*.supabase.co', 'https://api.openai.com'],
      'frame-ancestors': ["'none'"]
    }
  },

  // Notification configurations
  notifications: {
    slack: {
      webhook: process.env.SLACK_WEBHOOK_URL,
      channel: '#deployments',
      username: 'Lilou Deploy Bot'
    },
    email: {
      enabled: process.env.EMAIL_NOTIFICATIONS === 'true',
      recipients: process.env.DEPLOYMENT_EMAIL_RECIPIENTS?.split(',') || []
    }
  },

  // Monitoring and health checks
  monitoring: {
    healthCheck: {
      path: '/api/health',
      interval: 300000, // 5 minutes
      timeout: 10000 // 10 seconds
    },
    uptime: {
      enabled: true,
      providers: ['vercel', 'netlify']
    }
  }
};

// Export configuration based on environment
const getConfig = (environment = 'development', platform = 'vercel') => {
  const envConfig = deployConfig.environments[environment];
  const platformConfig = deployConfig.platforms[platform];
  
  if (!envConfig) {
    throw new Error(`Invalid environment: ${environment}`);
  }
  
  if (!platformConfig) {
    throw new Error(`Invalid platform: ${platform}`);
  }
  
  return {
    ...deployConfig,
    currentEnvironment: envConfig,
    currentPlatform: platformConfig
  };
};

module.exports = {
  deployConfig,
  getConfig
};