import { isRef, onUnmounted, reactive, ref, Ref } from 'vue'

/** 脉冲监听器 */
export class Monitor {
  /** 监听器元信息池 */
  pool: Map<Ref | {}, () => any> = new Map
  private id: number | null = null

  /**
   *
   * @param time 脉冲间隔时间
   * @param autoUnmounted 是否自动卸载，默认为`true`
   */
  constructor(public time: number = 30, autoUnmounted: boolean = true) {
    this.start()
    if(autoUnmounted) onUnmounted(() => {
      this.end()
    })
  }

  /** 状态 */
  get state() {
    return !!this.id
  }

  CALLBACK() {
    this.pool.forEach((value, key) => {
      const v = value()
      if(isRef(key)) {
        key.value = v
      } else {
        Object.assign(key, v)
      }
    })
  }

  /**
   * 开始监听
   * @return 操作成功
   */
  start() {
    if(this.id) return false
    setInterval(this.CALLBACK.bind(this), this.time)
    return true
  }

  /**
   * 结束监听
   * @return 操作成功
   */
  end() {
    if(!this.id) return false
    clearInterval(this.id)
    return true
  }

  /**
   * 添加监听器，返回响应对象
   * @param value 一个返回需要监听的值的函数
   * @return 监听器ref对象，可用于取消监听
   */
  ref<T extends number | string | boolean | undefined | null>(value: () => T) {
    const r = ref<T>(value())
    this.pool.set(r, value)
    return r
  }

  reactive<T extends {}>(value: () => T) {
    const r = reactive<T>(value())
    this.pool.set(r, value)
    return r
  }

  object<T extends {}, P extends keyof T>(o: T, a: P[]) {
    return this.reactive(() => {
      const p: Partial<T> = {}
      a.forEach(e => {
        p[e] = o[e]
      })
      return p
      // @ts-ignore
    }, def)
  }

  /**
   * 取消监听
   * @param id 监听器id
   */
  remove(id: Ref | {}) {
    return this.pool.delete(id)
  }

  /**
   * 查找监听器
   * @param id
   * @return 监听器元信息。[value, oldValue, handle]
   */
  find(id: number) {
    return this.pool.get(id)
  }
}
