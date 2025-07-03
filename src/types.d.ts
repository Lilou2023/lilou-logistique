// Type definitions for virtual modules
declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration) => void
    onRegisterError?: (error: Error) => void
  }
  
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}