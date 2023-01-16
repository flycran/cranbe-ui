import '@vue/runtime-core'
import { App } from 'vue'
import CeSlider from "./CeSlider.vue"

const components = [ CeSlider ]

export {
  CeSlider,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}