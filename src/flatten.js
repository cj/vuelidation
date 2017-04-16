const isObject = item => {
  return !!(item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}

const flatten = (source, flatKey) => {
  let newSource = {}

  Object.keys(source).forEach(key => {
    let value = source[key]
    let currentFlatKey = flatKey ? `${flatKey}.${key}` : key

    if (isObject(value)) {
      newSource = Object.assign(newSource, flatten(value, currentFlatKey))
    } else {
      newSource[currentFlatKey] = value
    }
  })

  return newSource
}

export default flatten
