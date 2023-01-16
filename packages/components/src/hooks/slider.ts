import { reactive, ref } from 'vue'

export interface SlidingInfo {
  oldX: number
  oldY: number
  newX: number
  newY: number
  moveX: number
  moveY: number
}

export interface Coordinate {
  x: number,
  y: number,
}

/**
 * 创建滑块
 * @param events
 */
export function createSlider(events: {
  onmove?: (info: SlidingInfo) => void
  ondown?: (event: MouseEvent) => void | boolean
  onup?: (event: MouseEvent) => void
  getter?: () => Partial<Coordinate>
  setter?: (coordinate: Coordinate, info: SlidingInfo) => void
}) {
  let isDown = ref(false)
  const old = {
    x: 0,
    y: 0,
  }

  const info: SlidingInfo = reactive({
    oldX: 0,
    oldY: 0,
    newX: 0,
    newY: 0,
    moveX: 0,
    moveY: 0,
  })

  const down = (e: MouseEvent) => {
    if(events.ondown) {
      if(events.ondown(e)) return
    }
    isDown.value = true
    info.oldX = e.clientX
    info.oldY = e.clientY
    if(events.getter) {
      const s = events.getter()
      if(s) Object.assign(old, s)
    }
  }

  const move = (e: MouseEvent) => {
    if(!isDown.value) return
    if(events.onmove) events.onmove(info)
    info.newX = e.clientX
    info.newY = e.clientY
    info.moveX = e.clientX - info.oldX
    info.moveY = e.clientY - info.oldY
    if(events.setter) {
      const c = {
        x: old.x + info.moveX,
        y: old.y + info.moveY,
      }
      events.setter(c, info)
    }
  }

  const up = (e: MouseEvent) => {
    if(!isDown.value) return
    if(events.onup) events.onup(e)
    isDown.value = false
    info.oldX = 0
    info.oldY = 0
    info.moveX = 0
    info.moveY = 0
  }
  let element: HTMLElement

  const mount = (slider: HTMLElement) => {
    element = slider
    slider.addEventListener('mousedown', down)
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const unmount = () => {
    isDown.value = false
    element.removeEventListener('mousedown', down)
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  return {
    down(e: {
      clientX: number
      clientY: number
    } | any) {
      down(e)
    },
    move(e: {
      clientX: number
      clientY: number
    } | any) {
      move(e)
    },
    up(e: {
      clientX: number
      clientY: number
    } | any) {
      down(e)
    },
    isDown,
    info,
    mount,
    unmount,
  }
}