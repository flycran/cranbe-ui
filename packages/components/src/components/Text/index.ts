import '@vue/runtime-core'
import { App } from 'vue'
import CeText from "./CeText.vue"

const components = [ CeText ]

export {
  CeText
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
