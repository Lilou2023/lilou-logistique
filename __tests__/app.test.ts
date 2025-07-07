import { add } from '@/app/utils'

describe('add function', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
  })
})
