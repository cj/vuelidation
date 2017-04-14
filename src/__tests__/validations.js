import validations from '../validations'

const {
  alphabetic,
  alpha,
  alphaDash,
  alphaSpace,
  between,
  decimal,
  email,
  includes,
  numeric,
  required,
} = validations

describe('validations', () => {
  test('alphabetic', () => {
    expect(alphabetic('a')[0]).toBe(true)
    expect(alphabetic('1')[0]).toBe(false)
  })

  test('alpha', () => {
    expect(alpha('a1')[0]).toBe(true)
    expect(alpha('-')[0]).toBe(false)
  })

  test('alphaDash', () => {
    expect(alphaDash('a1-')[0]).toBe(true)
    expect(alphaDash(' ')[0]).toBe(false)
  })

  test('alphaSpace', () => {
    expect(alphaSpace('a 1')[0]).toBe(true)
    expect(alphaSpace('-')[0]).toBe(false)
  })

  test('between', () => {
    const args = { min: 1, max: 10 }

    expect(between('9', args)[0]).toBe(true)
    expect(between('11', args)[0]).toBe(false)
  })

  test('decimal', () => {
    const args = { points: 2 }

    expect(decimal(2.00, args)[0]).toBe(false)
    expect(decimal('2.00', args)[0]).toBe(true)
    expect(decimal('2.000', args)[0]).toBe(false)
    expect(decimal('2.000')[0]).toBe(true)
    expect(decimal(null)[0]).toBe(false)
    expect(decimal(undefined)[0]).toBe(false)
    expect(decimal('')[0]).toBe(false)
  })

  test('email', () => {
    expect(email('foo@bar.com')[0]).toBe(true)
    expect(email('foo+bar@bar.com')[0]).toBe(true)
    expect(email('foo+bar@bar.io')[0]).toBe(true)
    expect(email('foo@bar.a')[0]).toBe(false)
    expect(email('foo@barcom')[0]).toBe(false)
  })

  test('includes', () => {
    const args = { values: ['foo', 'bar'] }

    expect(includes('foo', args)[0]).toBe(true)
    expect(includes('foobar', args)[0]).toBe(false)
  })

  test('numeric', () => {
    expect(numeric('123456')[0]).toBe(true)
    expect(numeric('123456abc')[0]).toBe(false)
  })

  test('required', () => {
    expect(required('a')[0]).toBe(true)
    expect(required('')[0]).toBe(false)
    expect(required(null)[0]).toBe(false)
    expect(required(undefined)[0]).toBe(false)
  })
})
