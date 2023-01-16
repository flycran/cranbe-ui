import '@vue/runtime-core'
import { App } from 'vue'
import CeCheckbox from "./CeCheckbox.vue"
import CeMultipleChoice from "./CeMultipleChoice.vue"

const components = [ CeCheckbox, CeMultipleChoice ]

export {
  CeCheckbox,
  CeMultipleChoice,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}
