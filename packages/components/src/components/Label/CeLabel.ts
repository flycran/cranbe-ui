import '@vue/runtime-core'
import { App } from 'vue'
import CeLabel from "./CeLabel.vue"

const components = [ CeLabel ]

export {
  CeLabel
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}