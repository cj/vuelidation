<script>
  export default {
    name: 'login-view',

    data () {
      return {
        requiredMsg: '{{ field }} is required',
        username: '',
        password: '',
        email: '',

        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: '',
        },
      }
    },

    vuelidation: {
      data: {
        username: {
          msg () {
            return this.requiredMsg
          },
          required: true,
        },

        password: {
          required: true,
        },

        email: {
          required: true,

          unless () { return this.username },
        },

        fullName: {
          required: true,

          if () {
            return this.username
          },
        },

        year: {
          between: {
            min: 2000,
            max: 2017,
          },
        },

        address: {
          line1: {
            required: true,
          },

          city: {
            required: true,
          },

          state: {
            required: true,
          },

          zip: {
            required: true,
          },
        },
      },

      msg: {
        invalid: 'Invalid',
      },
    },
  }
</script>

<template>
  <div>
    moo
  </div>
</template>
