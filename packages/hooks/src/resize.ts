import { ComponentPublicInstance, isRef, onBeforeUnmount, onMounted, reactive, Ref } from 'vue'

type ElementRef = Ref<HTMLDivElement | ComponentPublicInstance | null>
type sizeRef = { width: number, height: number }

export function resize(ref: ElementRef): sizeRef
export function resize<T extends string>(refs: { [k in T]: ElementRef }): { [k in T]: sizeRef }
export function resize(p: ElementRef | {}): any {
  if(isRef(p)) {
    if(!p.value) throw new Error('missing required element')
    // @ts-ignore
    const ele: HTMLElement = p.value instanceof HTMLElement ? p.value : p.value.$el
    const size = reactive({ width: ele.offsetWidth, height: 0 })
    const so = new ResizeObserver(() => {
      size.width = ele.offsetWidth
      size.height = ele.offsetHeight
    })
    onMounted(() => {
      so.observe(ele)
    })
    onBeforeUnmount(() => {
      so.unobserve(ele)
    })
    return size
  }
}