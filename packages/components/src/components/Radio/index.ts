import '@vue/runtime-core'
import { App } from 'vue'
import CeRadio from "./CeRadio.vue"
import CeSingleChoice from "./CeSingleChoice.vue"

const components = [ CeRadio, CeSingleChoice ]

export {
  CeRadio,
  CeSingleChoice
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
