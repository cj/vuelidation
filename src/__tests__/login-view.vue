<script>
  export default {
    name: 'login-view',

    data () {
      return {
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
      model: {
        username: {
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
            return !!this.username.length
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
