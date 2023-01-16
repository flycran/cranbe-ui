import '@vue/runtime-core'
import { App } from 'vue'
import CeLink from './CeLink.vue'

const components = [ CeLink ]

export {
  CeLink
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
