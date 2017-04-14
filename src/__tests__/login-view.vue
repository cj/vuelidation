<script>
  export default {
    name: 'login-view',

    data () {
      return {
        username: '',
        password: '',

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
