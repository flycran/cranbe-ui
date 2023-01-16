import '@vue/runtime-core'
import { App } from 'vue'
import CeState from "./CeState.vue"

const components = [ CeState ]

export {
  CeState,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}

export type StateType = 'empty' | 'success' | 'fail' | 'info' | 'warning'