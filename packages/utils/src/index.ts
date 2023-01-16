export function offset(ele: HTMLElement, stop?: HTMLElement) {
  let e: HTMLElement | null = ele
  let x = 0, y = 0
  while(e) {
    if(stop && stop.isEqualNode(e)) break
    x += e.offsetLeft
    y += e.offsetTop
    e = e.offsetParent as HTMLElement | null
  }
  return { x, y }
}

export function findParent(ele: HTMLElement, callBack: (e: HTMLElement) => any) {
  let e: HTMLElement | null = ele
  while(e) {
    if(callBack(e)) return e
    e = e.parentElement
  }
  return false
}

export function delayPrint<T extends any[]>(callback: (...args: T) => any, delay: number): (...args: T) => void {
  let timer: NodeJS.Timeout | null = null

  return (...args: T) => {
    if(timer !== null) {
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      callback(...args)
      timer = null
    }, delay)
  }
}

function ride(a: number, b: number) {
  const c = a.toString().split(".")[1]
  const d = b.toString().split(".")[1]
  const e = c ? c.length : 0
  const f = d ? d.length : 0
  let g = e + f
  return +(a * b).toFixed(g)
}

export const nearestMultiple = (n: number, p: number) => ride(p, Math.round(n / p))

export const limits = (n: number, min: number, max: number) => n < min ? min : (n > max ? max : n)

