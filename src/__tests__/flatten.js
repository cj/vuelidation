import flatten from '../flatten'

test('flatten', () => {
  const objToFlatten = {
    a: {
      b: null,
      c: {
        d: {
          e: 'f',
          g: 'h',
        },
      },
    },
    foo: 'bar',
  }

  expect(flatten(objToFlatten)).toEqual({
    'a.b': null,
    'a.c.d.e': 'f',
    'a.c.d.g': 'h',
    'foo': 'bar',
  })
})
