import '@vue/runtime-core'
import { App } from 'vue'
import CeIllustration from "./CeIllustration.vue"

const components = [ CeIllustration ]

export {
  CeIllustration,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}