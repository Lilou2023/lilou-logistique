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
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
