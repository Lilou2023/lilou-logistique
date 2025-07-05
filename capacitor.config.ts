import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.lilou.logistique',
  appName: 'Lilou Logistique',
  webDir: 'dist',
  bundledWebRuntime: false,
  
  // Performance optimizations
  server: {
    // Enable live reload for development
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : undefined,
    cleartext: true
  },

  // iOS specific optimizations
  ios: {
    scheme: 'Lilou Logistique',
    contentInset: 'automatic',
    // Performance optimizations
    preferredContentMode: 'mobile',
    allowsLinkPreview: false,
    // Memory management
    limitsNavigationsToAppBoundDomains: true,
    // Disable unused features for better performance
    scrollEnabled: true
  },

  // Android specific optimizations
  android: {
    // Performance optimizations
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: process.env.NODE_ENV === 'development',
    // Memory optimizations
    loggingBehavior: process.env.NODE_ENV === 'development' ? 'debug' : 'none',
    // Disable unused features
    useLegacyBridge: false
  },

  // Plugin configurations for performance
  plugins: {
    // App plugin configuration
    App: {
      launchAutoHide: true,
      launchShowDuration: 0,
      launchFadeOutDuration: 0,
      backgroundColor: '#ffffff',
      iosLaunchMode: 'fullscreen'
    },

    // Status bar configuration
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff',
      overlay: false
    },

    // Keyboard configuration
    Keyboard: {
      resize: 'body',
      style: 'default',
      resizeOnFullScreen: true
    },

    // Network configuration for API performance
    CapacitorHttp: {
      enabled: true
    },

    // Storage optimization
    Preferences: {
      group: 'LilouLogistique'
    },

    // Geolocation for logistics tracking
    Geolocation: {
      permissions: {
        location: 'whenInUse'
      }
    },

    // Push notifications for delivery updates
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
}

export default config