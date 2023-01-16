import '@vue/runtime-core'
import { App } from 'vue'
import CeGrid from './CeGrid.vue'
import CeGridItem from './CeGridItem.vue'

const components = [ CeGrid, CeGridItem ]

export {
  CeGrid,
  CeGridItem
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}