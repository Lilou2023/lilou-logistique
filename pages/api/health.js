/**
 * Health Check API Endpoint
 * Used for monitoring and deployment verification
 */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Basic health checks
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        server: 'ok',
        database: 'checking',
        external_apis: 'checking'
      }
    };

    // Check Supabase connection
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        // Simple check to see if Supabase URL is reachable
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
          }
        });
        
        healthCheck.checks.database = response.ok ? 'ok' : 'error';
      } else {
        healthCheck.checks.database = 'not_configured';
      }
    } catch (error) {
      healthCheck.checks.database = 'error';
      console.error('Database health check failed:', error.message);
    }

    // Check OpenAI API availability
    try {
      if (process.env.OPENAI_API_KEY) {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        });
        
        healthCheck.checks.external_apis = response.ok ? 'ok' : 'error';
      } else {
        healthCheck.checks.external_apis = 'not_configured';
      }
    } catch (error) {
      healthCheck.checks.external_apis = 'error';
      console.error('External APIs health check failed:', error.message);
    }

    // Determine overall status
    const hasErrors = Object.values(healthCheck.checks).some(status => status === 'error');
    if (hasErrors) {
      healthCheck.status = 'unhealthy';
    }

    // Return appropriate HTTP status
    const httpStatus = healthCheck.status === 'healthy' ? 200 : 503;
    
    return res.status(httpStatus).json(healthCheck);
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error.message
    });
  }
}