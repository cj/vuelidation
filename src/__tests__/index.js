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

      test('#errors', () => {
        vm.$vuelidation.valid()

        expect(Object.keys(vm.$vuelidation.errors())).toEqual(
          expect.arrayContaining(['username', 'password'])
        )
      })

      test('#error', () => {
        vm.$vuelidation.valid()

        expect(vm.$vuelidation.error('username')).toEqual('Required')
        expect(vm.$vuelidation.error('password')).toEqual('Required')
      })
    })
  })
})
