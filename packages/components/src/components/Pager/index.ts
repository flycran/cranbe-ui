import '@vue/runtime-core'
import { App } from 'vue'
import CePager from "./CePager.vue"

const components = [ CePager ]

export {
  CePager
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
