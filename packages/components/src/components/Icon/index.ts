import '@vue/runtime-core'
import { App } from 'vue'
import CeIcon from './CeIcon.vue'

const components = [ CeIcon ]

export {
  CeIcon
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
