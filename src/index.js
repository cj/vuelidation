import validations from './validations'
import _template   from 'lodash/template'
import _get        from 'lodash/get'

const pathDelimiter = '.'

function flatten (source, flattened = {}, keySoFar = '') {
  function getNextKey (key) {
    return `${keySoFar}${keySoFar ? pathDelimiter : ''}${key}`
  }
  if (typeof source === 'object') {
    for (const key in source) {
      flatten(source[key], flattened, getNextKey(key))
    }
  } else {
    flattened[keySoFar] = source
  }
  return flattened
}

const defaultOptions = {
  msg: {},
  methods: {},
}

function renderMsg (msg, args) {
  return _template(args.msg || msg, { interpolate: /{{([\s\S]+?)}}/g })(args)
}

function valid (path) {
  let models      = this.$options.vuelidation.model
  let validations = _get(models, path, models)

  Object.entries(validations).forEach(([model, modelValidations]) => {
    let modelPath = path ? `${path}.${model}` : model

    validate.call(this, modelPath, _get(this, modelPath), modelValidations)
  })

  return !this.vuelidationErrors
}

function error (model) {
  const errors = this.vuelidationErrors || {}
  let error    = errors[model]

  return error ? error[0] : null
}

function setErrors (newErrors) {
  let errors = this.vuelidationErrors = this.vuelidationErrors || {}

  Object.entries(newErrors).forEach(([model, modelValidations]) => {
    errors[model] = []

    if (!Array.isArray(modelValidations)) {
      modelValidations = Array(modelValidations)
    }

    modelValidations.forEach(msg => {
      let validation    = this.$vuelidation.methods[msg]
      let validationMsg = this.$vuelidation.options.msg[msg] || msg

      errors[model].push(renderMsg(validationMsg, validation || {}))
    })
  })
}

function validate (path, value, modelValidations) {
  let errors = []

  if (modelValidations.if && !modelValidations.if.call(this)) {
    return
  }

  if (modelValidations.unless && !!modelValidations.unless.call(this)) {
    return
  }

  Object.entries(modelValidations).forEach(([name, args]) => {
    let validation = this.$vuelidation.methods[name]

    if (validation) {
      const [valid, msg] = validation(value, args)

      if (!valid) {
        errors.push(renderMsg(msg, args))
      }
    }
  })

  if (errors.length) {
    this.vuelidationErrors = this.vuelidationErrors || {}
    this.vuelidationErrors[path] = errors
  } else if (this.vuelidationErrors) {
    if (this.vuelidationErrors[path]) {
      delete this.vuelidationErrors[path]
    }

    if (Object.keys(this.vuelidationErrors).length === 0) {
      this.vuelidationErrors = null
    }
  }
}

const install = (Vue, options = {}) => {
  options = {...defaultOptions, ...options}

  Vue.mixin({
    created () {
      const vuelidation = this.$options.vuelidation

      if (vuelidation && vuelidation.model) {
        Object.entries(flatten(this.$data)).forEach(([path, _]) => {
          let validations = _get(vuelidation.model, path)

          if (validations) {
            this.$watch(path, value => {
              validate.call(this, path, value, validations)
            })
          }
        })
      }
    },

    computed: {
      $vuelidation () {
        return {
          error: model => {
            return error.call(this, model)
          },
          errors: path => {
            return _get(this.vuelidationErrors, path, this.vuelidationErrors)
          },
          setErrors: errors => {
            return setErrors.call(this, errors)
          },
          reset: () => {
            this.vuelidationErrors = null
          },
          valid: model => {
            return valid.call(this, model)
          },
          options: {
            ...options,
            ...this.$options.vuelidation,
          },
          methods: {
            ...validations,
            ...options.methods,
            ...(this.$options.vuelidation.methods),
          },
        }
      },
    },

    data () {
      return {
        vuelidationErrors: null,
      }
    },
  })
}

export default {
  install,
  renderMsg,
  defaultOptions,
  version: '__VERSION__',
}
