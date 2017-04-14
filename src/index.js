import validations from './validations'
import _template   from 'lodash/template'

const defaultOptions = {
  msg: {},
  methods: {},
}

export function renderMsg (msg, args) {
  return _template(args.msg || msg, { interpolate: /{{([\s\S]+?)}}/g })(args)
}

function valid (modelName) {
  let validations = modelName ? this.$options.vuelidation.model[modelName] : this.$options.vuelidation.model

  Object.entries(validations).forEach(([model, modelValidations]) => {
    validate.call(this, model, this[model], modelValidations)
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

function validate (model, value, modelValidations) {
  let errors = []

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
    this.vuelidationErrors[model] = errors
  } else if (this.vuelidationErrors) {
    if (this.vuelidationErrors[model]) {
      delete this.vuelidationErrors[model]
    }

    if (Object.keys(this.vuelidationErrors).length === 0) {
      this.vuelidationErrors = null
    }
  }
}

export default (Vue, options = {}) => {
  options = {...defaultOptions, ...options}

  Vue.mixin({
    created () {
      const vuelidation = this.$options.vuelidation

      if (vuelidation && vuelidation.model) {
        Object.entries(vuelidation.model).forEach(([model, modelValidations]) => {
          this.$watch(model, value => {
            validate.call(this, model, value, modelValidations)
          })
        })
      }
    },

    computed: {
      $vuelidation () {
        return {
          error: model => { return error.call(this, model) },
          errors: () => { return this.vuelidationErrors },
          setErrors: errors => { return setErrors.call(this, errors) },
          valid: model => { return valid.call(this, model) },
          options: {...options, ...this.$options.vuelidation},
          methods: {...validations, ...options.methods, ...(this.$options.vuelidation ? this.$options.vuelidation.methods : {})},
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
