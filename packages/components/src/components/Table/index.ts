import '@vue/runtime-core'
import { App } from 'vue'
import CeTable from './CeTable'
import CeTableRow from './CeTableRow.vue'

const components = [ CeTable, CeTableRow ]

export {
  CeTable,
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}

type AnyObject = { [x: string]: any }

export interface TableRow<T = any> {
  prop: Exclude<keyof T, symbol | number> | string
  getter?: ((row: T) => any)
  type?: string
  label?: string
  width?: number
  fixed?: 'left' | 'right'
}

export type TableRows<T = any> = TableRow<T>[]