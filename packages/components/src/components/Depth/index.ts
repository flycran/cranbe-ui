import '@vue/runtime-core'
import { App } from 'vue'
import CeDepth from './CeDepth.vue'

const components = [ CeDepth ]

export {
  CeDepth
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
