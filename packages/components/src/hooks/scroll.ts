import { createSlider } from '@c/hooks/slider'
import { ScrollState } from '@c/index'
import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref, Ref } from 'vue'

export function createScrollBarX(
  events?: { scroll?: (info: { scroll: number, state: ScrollState }) => void },
) {
  const scroll = ref(0)
  const state = ref<ScrollState>('start')
  const show = ref(false)
  let main: HTMLElement
  let thumb: HTMLElement
  let bar: HTMLElement | undefined
  // 滚动事件
  const calculation = () => {
    if(main.offsetWidth >= main.scrollWidth) {
      scroll.value = 0
      state.value = 'start'
      thumb.style.width = '100%'
      thumb.style.transform = 'translate(0, 0)'
      show.value = false
      return
    }
    show.value = true
    if(scroll.value === 0)
      state.value = 'start'
    else if(scroll.value >= main.scrollWidth - main.offsetWidth - 1)
      state.value = 'end'
    else state.value = 'in'
    const s = (main.offsetWidth / main.scrollWidth) * 100
    const t = scroll.value / main.offsetWidth * 100
    thumb.style.width = `${ s }%`
    thumb.style.transform = `translate(${ t }%, 0)`
    if(events?.scroll) events.scroll({ scroll: scroll.value, state: state.value })
  }

  const scrollEvent = () => {
    if(main.scrollLeft !== scroll.value) {
      scroll.value = main.scrollLeft
      calculation()
    }
  }

  const size = {
    scroll: 0,
    offset: 0,
  }

  // 容器尺寸监听
  const monitorSize = () => {
    if(size.offset !== main.offsetWidth) {
      size.offset = main.offsetWidth
      calculation()
    }
  }
  const ro = new ResizeObserver(monitorSize)
  // 内容尺寸监听
  const monitorScroll = () => {
    if(size.scroll !== main.scrollWidth) {
      size.scroll = main.scrollWidth
      show.value = main.scrollWidth > main.offsetWidth
      calculation()
    }
  }
  let timeId: any
  // 滑动
  let old = 0
  const slider = createSlider({
    ondown: () => {
      old = main.scrollLeft
    },
    onmove: (c) => {
      main.scrollLeft = old + c.moveX * main.scrollWidth / main.offsetWidth
    },
  })

  // 滑块导航
  const barClick = function (this: HTMLElement, e: MouseEvent) {
    if(!this.isEqualNode(e.target as HTMLElement)) return
    const s = (e.offsetX - thumb!.offsetWidth / 2) / main.offsetWidth * main.scrollWidth
    main.scrollTo({
      left: s,
      behavior: 'smooth',
    })
  }

  const mount = (elements?: { main: HTMLElement, thumb: HTMLElement, bar?: HTMLElement }) => {
    if(elements) {
      main = elements.main
      thumb = elements.thumb
      bar = elements.bar
    }
    main.style.overflowX = 'scroll'
    ro.observe(main)
    timeId = setInterval(monitorScroll, 50)
    slider.mount(thumb)
    main.addEventListener('scroll', scrollEvent, {
      capture: true,
      passive: true,
    })
    if(bar) bar.addEventListener('click', barClick)
  }

  const unmount = () => {
    if(main) {
      main.style.overflowX = 'hidden'
      show.value = false
      main.removeEventListener('scroll', scrollEvent)
      ro.unobserve(main)
      clearInterval(timeId)
      slider.unmount()
      if(bar) bar.removeEventListener('click', barClick)
    }
  }

  return {
    scroll,
    state,
    down: slider.isDown,
    show,
    mount,
    unmount,
  }
}

export function createScrollBarY(
  events?: { scroll?: (info: { scroll: number, state: ScrollState }) => void },
) {
  const scroll = ref(0)
  const state = ref<ScrollState>('start')
  const show = ref(false)
  let main: HTMLElement
  let thumb: HTMLElement
  let bar: HTMLElement | undefined
  // 滚动事件
  const calculation = () => {
    if(main.offsetHeight >= main.scrollHeight) {
      scroll.value = 0
      state.value = 'start'
      thumb.style.height = '100%'
      thumb.style.transform = 'translate(0, 0)'
      show.value = false
      return
    }
    show.value = true
    if(scroll.value === 0)
      state.value = 'start'
    else if(scroll.value >= main.scrollHeight - main.offsetHeight - 1)
      state.value = 'end'
    else state.value = 'in'
    const s = (main.offsetHeight / main.scrollHeight) * 100
    const t = scroll.value / main.offsetHeight * 100
    thumb.style.height = `${ s }%`
    thumb.style.transform = `translate(0, ${ t }%)`
    if(events?.scroll) events.scroll({ scroll: scroll.value, state: state.value })
  }

  const scrollEvent = () => {
    if(main.scrollTop !== scroll.value) {
      scroll.value = main.scrollTop
      calculation()
    }
  }

  const size = {
    scroll: 0,
    offset: 0,
  }

  // 容器尺寸监听
  const monitorSize = () => {
    if(size.offset !== main.offsetHeight) {
      size.offset = main.offsetHeight
      show.value = main.scrollHeight > main.offsetHeight
      calculation()
    }
  }
  const ro = new ResizeObserver(monitorSize)
  // 内容尺寸监听
  const monitorScroll = () => {
    if(size.scroll !== main.scrollHeight) {
      size.scroll = main.scrollHeight
      show.value = main.scrollHeight > main.offsetHeight
      calculation()
    }
  }
  let timeId: any
  // 滑动
  let old = 0
  const slider = createSlider({
    ondown: () => {
      old = main.scrollTop
    },
    onmove: (c) => {
      main.scrollTop = old + c.moveY * main.scrollHeight / main.offsetHeight
    },
  })

  // 滑块导航
  const barClick = function (this: HTMLElement, e: MouseEvent) {
    if(!this.isEqualNode(e.target as HTMLElement)) return
    const s = (e.offsetY - thumb!.offsetHeight / 2) / main.offsetHeight * main.scrollHeight
    main.scrollTo({
      top: s,
      behavior: 'smooth',
    })
  }

  const mount = (elements?: { main: HTMLElement, thumb: HTMLElement, bar?: HTMLElement }) => {
    if(elements) {
      main = elements.main
      thumb = elements.thumb
      bar = elements.bar
    }
    main.style.overflowY = 'scroll'
    ro.observe(main)
    timeId = setInterval(monitorScroll, 50)
    slider.mount(thumb)
    main.addEventListener('scroll', scrollEvent, {
      capture: true,
      passive: true,
    })
    if(bar) bar.addEventListener('click', barClick)
  }

  const unmount = () => {
    if(main) {
      main.style.overflowY = 'hidden'
      show.value = false
      main.removeEventListener('scroll', scrollEvent)
      ro.unobserve(main)
      clearInterval(timeId)
      slider.unmount()
      if(bar) bar.removeEventListener('click', barClick)
    }
  }

  return {
    scroll,
    state,
    down: slider.isDown,
    show,
    mount,
    unmount,
  }
}

/**
 * 创建基于vue的滚动插件，自动挂载生命周期
 * @param elements
 * @param events
 */
export function createScrollBar(elements: {
  mainEl: Ref<HTMLElement | ComponentPublicInstance | null | undefined>
  thumbYEl?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>
  thumbXEl?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>
  barXEl?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>
  barYEl?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>
}, events?: {
  scrollX?: (info: {}) => void,
  scrollY?: (info: {}) => void,
}) {
  const scrollBarX = createScrollBarX({
    scroll(e) {
      if(events?.scrollX) events.scrollX(e)
    },
  })
  const scrollBarY = createScrollBarY({
    scroll(e) {
      if(events?.scrollY) events.scrollY(e)
    },
  })
  onMounted(() => {
    const m = elements.mainEl.value
    const tx = elements.thumbXEl?.value
    const ty = elements.thumbYEl?.value
    const bx = elements.barXEl?.value
    const by = elements.barYEl?.value
    if(!m) return
    const main = m instanceof HTMLElement ? m : m.$el
    const thumbX = tx ? (tx instanceof HTMLElement ? tx : tx.$el) : null
    const thumbY = ty ? (ty instanceof HTMLElement ? ty : ty.$el) : null
    const barX = bx ? (bx instanceof HTMLElement ? bx : bx.$el) : null
    const barY = by ? (by instanceof HTMLElement ? by : by.$el) : null
    scrollBarX.mount({
      main,
      thumb: thumbX,
      bar: barX,
    })
    scrollBarY.mount({
      main,
      thumb: thumbY,
      bar: barY,
    })
  })
  onBeforeUnmount(() => {
    scrollBarX.unmount()
    scrollBarY.unmount()
  })
  return {
    scrollBarX,
    scrollBarY,
  }
}