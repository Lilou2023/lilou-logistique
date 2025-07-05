// Test setup file for Vitest
import '@testing-library/jest-dom'

// Mock performance APIs
Object.defineProperty(window, 'performance', {
  value: {
    mark: () => {},
    measure: () => {},
    getEntriesByType: () => [],
    now: () => Date.now(),
  },
  writable: true,
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null
  rootMargin: string = '0px'
  thresholds: ReadonlyArray<number> = [0]
  
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}