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
  root = null
  rootMargin = ''
  thresholds = []
  
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as any