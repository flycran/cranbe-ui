export class Timer {
  id: NodeJS.Timeout | null = null

  /**
   *
   * @param callBack 回调函数
   * @param time 时间（毫秒）
   */
  constructor(public callBack: Function, public time: number) {
  }

  /**
   * 开始计时
   * @param args 传递给`callBack`的参数
   */
  start(...args: any[]) {
    if(this.id) return false
    this.id = setTimeout(this.callBack.bind(this, ...args), this.time)
    return true
  }

  /**
   * 重新计时
   * @param args 传递给`callBack`的参数
   */
  reset(...args: any[]) {
    if(this.id) clearTimeout(this.id)
    this.id = setTimeout(this.callBack.bind(this, args), this.time)
    return true
  }

  /**
   * 跳过计时
   * @param args 传递给`callBack`的参数
   */
  skip(...args: any[]) {
    if(this.id) clearTimeout(this.id)
    this.id = null
    this.callBack.call(this, ...args)
  }

  /**
   * 停止计时
   */
  stop() {
    if(this.id) clearTimeout(this.id)
    this.id = null
  }
}