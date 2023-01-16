import '@vue/runtime-core'
import { App } from 'vue'
import CeScroll from "./CeScroll.vue"
import CeScrollOver from "./CeScrollOver.vue"

const components = [ CeScroll, CeScrollOver ]

export {
  CeScroll,
  CeScrollOver
}

export default {
  install(Vue: App) {
    for(let i = 0; i < components.length; i++) {
      const component = components[i]
      Vue.component(component.name!, component)
    }
  },
}

/**
 * 滚动状态
 * @description 描述滚动状态
 * @description start: 起始位置(最上或最左)
 * @description end: 末尾位置(最下或最右)
 * @description in: 中间位置
 */
export type ScrollState = 'start' | 'end' | 'in'

/**
 * 滚动信息
 * @description CeScroll组件中`scroll`事件的参数
 */
export interface ScrollInfo {
  x: number
  y: number
  stateX: ScrollState
  stateY: ScrollState
}

export type SliderState = '' | 'into' | 'press'

export interface SliderInfo {
  x: SliderState
  y: SliderState
}