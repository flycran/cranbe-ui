import { watch } from 'vue'

export type CallBack<T = any> = (item: T) => any

interface Props<T> {
  options?: T[]
  getter?: CallBack<T>
  setter?: CallBack<T>
  proxy?: CallBack<T>
  find?: CallBack<T>
}

export class InteriorEach<T> {
  private readonly getCache = new Map<T, any>()
  private readonly setCache = new Map<T, any>()

  constructor(public readonly props: Props<T>, base?: {
    getter?: CallBack<T>,
    setter?: CallBack<T>,
  }) {
    if(base) {
      if(base.getter) this.baseGetter = base.getter
      if(base.setter) this.baseSetter = base.setter
    }
    watch(() => props.options, () => {
      const { getCache, setCache, props: { options } } = this
      if(!options) return
      getCache.clear()
      setCache.clear()
      for(let i = 0; i < options.length; i++) {
        const e = options[i]
        getCache.set(e, this.baseGetter(e))
        setCache.set(e, this.baseSetter(e))
      }
    }, {
      deep: true,
      immediate: true,
    })
  }

  getter(e: T) {
    return this.getCache.get(e)
  }

   setter(e: T) {
    return this.setCache.get(e)
  }

  private readonly baseGetter: (this: InteriorEach<T>, e: T) => any = function (e) {
    if(e === undefined) return
    const { props } = this
    if(props.getter) return props.getter.call(this, e)
    if(props.proxy) return props.proxy.call(this, e)
    return e
  }
  private readonly baseSetter: (this: InteriorEach<T>, e: T) => any = function (e) {
    if(e === undefined) return
    const { props } = this
    if(props.setter) return props.setter.call(this, e)
    if(props.proxy) return props.proxy.call(this, e)
    return e
  }
}
