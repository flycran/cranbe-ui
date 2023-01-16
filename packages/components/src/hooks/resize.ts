import { onBeforeUnmount, onMounted, reactive, Ref } from 'vue'

export class Resize {
  readonly ref = reactive({
    width: 0,
    height: 0,
  })
  private readonly rso

  constructor(public readonly element: Ref<HTMLElement | null | undefined>) {
    this.rso = new ResizeObserver(() => {
      this.ref.width = element.value!.offsetWidth
      this.ref.height = element.value!.offsetHeight
    })
  }

  /**
   * 直接获取`ref`对象，自动挂载生命周期
   * @param element
   */
  static getRef(element: Ref<HTMLElement | null | undefined>) {
    const rs = new Resize(element)
    onMounted(() => {
      rs.mount()
    })
    onBeforeUnmount(() => {
      rs.unmount()
    })
    return rs.ref
  }

  mount() {
    this.rso.observe(this.element.value!)
  }

  unmount() {
    this.rso.unobserve(this.element.value!)
  }
}