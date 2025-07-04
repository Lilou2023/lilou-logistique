/**
 * Configuration du webhook Hostinger pour le déploiement automatique
 * Lilou Logistique - Automatic Deployment Webhook Configuration
 */

module.exports = {
  hostinger: {
    url: 'https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Lilou-Logistique-Deploy-System'
    }
  },
  
  // Fonction pour créer le payload du webhook
  createPayload: (context) => {
    return {
      repository: context.repository || 'Lilou2023/lilou-logistique',
      ref: context.ref || 'refs/heads/main',
      commit: context.commit || process.env.GITHUB_SHA,
      branch: context.branch || 'main',
      workflow: context.workflow || 'deployment',
      run_id: context.run_id || process.env.GITHUB_RUN_ID,
      run_number: context.run_number || process.env.GITHUB_RUN_NUMBER,
      timestamp: new Date().toISOString(),
      bundle_size: context.bundle_size || 'unknown',
      source: context.source || 'github-actions',
      message: context.message || 'Automatic deployment triggered'
    };
  },
  
  // Fonction pour appeler le webhook
  callWebhook: async (context = {}) => {
    const config = module.exports.hostinger;
    const payload = module.exports.createPayload(context);
    
    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify(payload)
      });
      
      return {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        payload: payload
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        payload: payload
      };
    }
  }
};