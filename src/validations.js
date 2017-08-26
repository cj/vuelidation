import _isEmpty  from 'lodash/isEmpty'
import _isString from 'lodash/isString'

export default {
  alphabetic (value) {
    const msg   = 'Must be a alphabetic value'
    const valid = !Array.isArray(value) && /^[a-zA-Z]*$/.test(value)

    return [valid, msg]
  },

  alpha (value) {
    const msg   = 'Must only contain letters and numbers'
    const valid = !Array.isArray(value) && /^[a-zA-Z0-9]*$/.test(value)

    return [valid, msg]
  },

  alphaDash (value) {
    const msg   = 'Must only contain letters, numbers, underscores or dashes'
    const valid = !Array.isArray(value) && /^[a-zA-Z0-9_-]*$/.test(value)

    return [valid, msg]
  },

  alphaSpace (value) {
    let msg   = 'Must only contain letters, numbers or spaces'
    let valid = !Array.isArray(value) && /^[a-zA-Z0-9\s]*$/.test(value)

    return [valid, msg]
  },

  length (value, totalLength) {
    let msg   = `Must be ${totalLength} character(s)`
    let valid = !!value && value.length === Number(totalLength)

    return [valid, msg]
  },

  between (value, args) {
    let msg   = 'Must be between {{ min }} and {{ max }}'
    let valid = Number(args.min) <= value && Number(args.max) >= value

    return [valid, msg]
  },

  betweenLength (value, args) {
    let msg   = 'Must have between {{ min }} and {{ max }} characters'
    let valid = Number(args.min) <= value.length && Number(args.max) >= value.length

    return [valid, msg]
  },

  decimal (value, args = {}) {
    let points = args.points || (args.points = '*')
    let msg    = 'Must be a decimal<% if (points && points !== "*") { %> with {{ points }} points<% } %>'

    if (value === null || value === undefined || value === '') {
      return [false, msg]
    }

    const regexPart = points === '*' ? '*' : `{${points},${points}}`
    const regex = new RegExp(`^[0-9]*.?[0-9]${regexPart}$`)

    if (!regex.test(value)) {
      return [false, msg]
    }

    return [!Number.isNaN(parseFloat(value)), msg]
  },

  email (value) {
    let msg   = 'Not a valid email'
    let valid = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(value)

    return [valid, msg]
  },

  includes (value, args) {
    args.value = value
    let values = args.values
    let msg  = '{{ value }} is not one of the following: {{ values.join(", ") }}'

    return [!!values.filter(option => option === value).length, msg]
  },

  numeric (value) {
    let msg = 'Must be a numeric value'

    return [!Array.isArray(value) && /^[0-9]*$/.test(value), msg]
  },

  required (value) {
    let msg = 'Required'

    if (value !== null && value !== undefined) {
      value = value.toString()
    }

    if (_isString(value)) {
      value = value.trim()
    }

    return [!_isEmpty(value), msg]
  },
}
