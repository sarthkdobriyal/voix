import { describe, it, expect } from 'vitest'
import { User } from '@/models/user'

describe('User model', () => {
  it('has correct default values', () => {
    const user = new User({ email: 'test@test.com' })
    expect(user.level).toBe('A1')
    expect(user.plan).toBe('free')
    expect(user.streak).toBe(0)
    expect(user.totalPoints).toBe(0)
    expect(user.dailyExerciseCount).toBe(0)
    expect(user.dailySpeakingCount).toBe(0)
  })

  it('rejects invalid CEFR level', () => {
    const user = new User({ email: 'test@test.com', level: 'D1' })
    const error = user.validateSync()
    expect(error?.errors.level).toBeDefined()
  })

  it('rejects invalid plan type', () => {
    const user = new User({ email: 'test@test.com', plan: 'enterprise' })
    const error = user.validateSync()
    expect(error?.errors.plan).toBeDefined()
  })

  it('requires email', () => {
    const user = new User({})
    const error = user.validateSync()
    expect(error?.errors.email).toBeDefined()
  })
})
