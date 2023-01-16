import '@vue/runtime-core'
import { App } from 'vue'
import CeInput from './CeInput.vue'

const components = [ CeInput ]

export {
  CeInput
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
