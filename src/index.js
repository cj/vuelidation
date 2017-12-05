import _template   from 'lodash/template'
import _get        from 'lodash/get'
import validations from './validations'
import flatten     from './flatten'

const defaultOptions = {
  msg: {},
  methods: {},
}

function renderMsg (msg, args) {
  msg = args.msg || msg

  if (typeof msg === 'function') {
    msg = msg.call(this)
  }

  return _template(msg, { interpolate: /{{([\s\S]+?)}}/g })(args)
}

function valid (path) {
  let data        = this.$options.vuelidation.data
  let validations = _get(data, path, data)

  Object.entries(validations).forEach(([dataName, dataValidations]) => {
    let dataPath = path ? `${path}.${dataName}` : dataName

    validate.call(this, dataPath, _get(this, dataPath), dataValidations)
  })

  return !this.vuelidationErrors
}

function error (dataName) {
  const errors = this.vuelidationErrors || {}
  let error    = errors[dataName]

  return error ? error[0] : null
}

function setErrors (newErrors) {
  let errors = this.vuelidationErrors = this.vuelidationErrors || {}

  Object.entries(newErrors).forEach(([dataName, dataValidations]) => {
    errors[dataName] = []

    if (!Array.isArray(dataValidations)) {
      dataValidations = Array(dataValidations)
    }

    dataValidations.forEach(msg => {
      let validation    = this.$vuelidation.methods[msg] || {}
      let validationMsg = this.$vuelidation.options.msg[msg] || msg

      validation.field = validation.field || dataName

      errors[dataName].push(renderMsg.call(this, validationMsg, validation))
    })
  })
}

function validate (path, value, dataValidations) {
  let errors = []
  if (dataValidations.if && !dataValidations.if.call(this)) {
    return
  }

  if (dataValidations.unless && !!dataValidations.unless.call(this)) {
    return
  }

  if (typeof dataValidations === 'string') {
    return
  }

  Object.entries(dataValidations).forEach(([name, args]) => {
    let validation = this.$vuelidation.methods[name]
    let msgArgs = dataValidations
    let dataArgs = dataValidations[name]

    msgArgs.field = msgArgs.field || path

    if (typeof dataArgs === 'object') {
      Object.assign(msgArgs, dataValidations[name])
    }

    if (validation) {
      let [valid, msg] = validation(value, args)

      if (!valid) {
        errors.push(renderMsg.call(this, msg, msgArgs))
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

      if (vuelidation && vuelidation.data) {
        Object.entries(flatten(this.$data)).forEach(([path, _]) => {
          let validations = _get(vuelidation.data, path)

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
        if (this.$options.vuelidation !== undefined) {
          return {
            error: dataName => {
              return error.call(this, dataName)
            },
            errors: path => {
              return _get(this.vuelidationErrors, path, this.vuelidationErrors)
            },
            setErrors: errors => {
              return setErrors.call(this, errors)
            },
            reset: callback => {
              this.vuelidationErrors = null

              this.$nextTick(() => {
                this.vuelidationErrors = null

                if (callback) {
                  callback.call(this)
                }
              })
            },
            valid: dataName => {
              return valid.call(this, dataName)
            },
            options: {
              ...options,
              ...this.$options.vuelidation,
            },
            methods: {
              ...validations,
              ...options.methods,
              ...(this.$options.vuelidation.methods),
              // ...(this.$options.vuelidation ? this.$options.vuelidation.methods : {}),
            },
          }
        } else {
          return undefined
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
