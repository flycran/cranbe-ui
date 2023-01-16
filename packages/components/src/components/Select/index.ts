import '@vue/runtime-core'
import { App } from 'vue'
import CeSelect from "./CeSelect.vue"

const components = [ CeSelect ]

export {
  CeSelect
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
