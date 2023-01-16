import { App } from 'vue'

/** 元素数据容器 */
export class ElementData<T extends {}> {
  map: Map<Element, T> = new Map

  constructor(public def: T) {
  }

  set(el: Element, data: T) {
    return this.map.set(el, data)
  }

  get(el: Element): T {
    const d = this.map.get(el)
    if(!d) {
      const d = { ...this.def }
      this.map.set(el, d)
      return d
    }
    return d
  }
}

export default {
  install(Vue: App) {
  },
}