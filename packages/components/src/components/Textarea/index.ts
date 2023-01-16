import '@vue/runtime-core'
import { App } from 'vue'
import CeTextarea from "./CeTextarea.vue"

const components = [ CeTextarea ]

export {
  CeTextarea,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}