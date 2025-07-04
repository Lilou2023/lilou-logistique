// Test setup file for Vitest
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

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
if (typeof window !== 'undefined') {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null }
    unobserve() { return null }
    disconnect() { return null }
    root = null
    rootMargin = ''
    thresholds = []
    takeRecords() { return [] }
  } as any
}