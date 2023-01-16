import { onUnmounted } from 'vue'

export class Frame {

  private id: number | null = null

  constructor(public callBack: FrameRequestCallback, autoUnmounted: boolean = true) {
    if(autoUnmounted) onUnmounted(() => {
      this.end()
    })
  }

  get state() {
    return !!this.id
  }

  /**
   * 开始绘制
   * @return 操作成功
   */
  start() {
    if(this.id) return false
    const call: FrameRequestCallback = (time) => {
      this.callBack(time)
      this.id = window.requestAnimationFrame(call)
    }
    this.id = window.requestAnimationFrame(call)
    return true
  }

  /**
   * 结束绘制
   * @return 操作成功
   */
  end() {
    if(!this.id) return false
    window.cancelAnimationFrame(this.id)
    this.id = null
    return true
  }
}