import '@vue/runtime-core'
import { App } from 'vue'
import CeButton from './CeButton.vue'

const components = [ CeButton ]

export {
  CeButton,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}