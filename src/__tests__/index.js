import Vue       from 'vue/dist/vue'
import LoginView from './login-view'
import Vuelidation, {
  renderMsg,
} from '../index'

Vue.use(Vuelidation)

describe('vuelidation', () => {
  test('plugin installed', () => {
    expect(Vuelidation.installed).toBe(true)
  })

  test('#renderMsg', () => {
    const renderedMsg = renderMsg('{{ foo }}', {
      foo: 'bar',
    })

    expect(renderedMsg).toEqual('bar')
  })

  describe('component', () => {
    describe('$vuelidation', () => {
      let vm

      beforeEach(() => {
        vm = new Vue(LoginView).$mount()
      })

      test('#valid', () => {
        vm.username = 'foo'
        vm.password = 'bar'

        expect(vm.$vuelidation.valid()).toBe(true)
      })

      test('#errors', () => {
        vm.$vuelidation.valid()

        expect(Object.keys(vm.$vuelidation.errors())).toEqual(
          expect.arrayContaining(['username', 'password'])
        )
      })

      test('#error', () => {
        expect(vm.$vuelidation.error('notDefined')).toEqual(null)

        vm.$vuelidation.valid()

        expect(vm.$vuelidation.error('username')).toEqual('Required')
        expect(vm.$vuelidation.error('password')).toEqual('Required')
      })

      test('#setErrors', () => {
        vm.$vuelidation.setErrors({
          username: ['invalid', 'duplicate'],
          password: 'invalid',
        })

        expect(vm.$vuelidation.error('username')).toEqual('Invalid')
        expect(vm.$vuelidation.error('password')).toEqual('Invalid')
      })
    })
  })
})
