<script lang="ts" setup>
import { mountedWatch } from '@c/hooks'
import { createScrollBarX, createScrollBarY } from '@c/hooks/scroll'
import { ref } from 'vue'

const p = withDefaults(defineProps<{
  x?: boolean
  y?: boolean
  hiddenTime?: number
}>(), {
  tag: 'div',
  hiddenTime: 2000,
})
const emit = defineEmits<{
  (e: 'scroll', v: Event): void
}>()

const mainEl = ref()
const thumbXEl = ref()
const thumbYEl = ref()
const barXEl = ref()
const barYEl = ref()

const sbx = createScrollBarX()
const sby = createScrollBarY()

const { show: showX, state: stateX, down: downX } = sbx
const { show: showY, state: stateY, down: downY } = sby

mountedWatch(() => p.x, (v) => {
  if(v) {
    sbx.mount({
      main: mainEl.value,
      thumb: thumbXEl.value,
      bar: barXEl.value,
    })
  } else {
    sbx.unmount()
  }
})

mountedWatch(() => p.y, (v) => {
  if(v) {
    sby.mount({
      main: mainEl.value,
      thumb: thumbYEl.value,
      bar: barYEl.value,
    })
  } else {
    sby.unmount()
  }
})

// function mouseenterY() {
//
// }
// function mouseleaveY() {
//
// }
// function mouseenterX() {
//
// }
// function mouseleaveX() {
//
// }

// // 浮动
// /** 显示 */
// const floatState = ref<'' | 'x' | 'y'>('')
// /** 计时器 X */
// const timer = new Timer(() => {
//   floatState.value = ''
// }, p.hiddenTime)
// watch(() => sbx.down, (x) => {
//   floatState.value = 'x'
//   if(x) {
//     timer.reset()
//   } else {
//     timer.stop()
//   }
// })
// watch(() => sby.down, (y) => {
//   floatState.value = 'y'
//   if(y) {
//     timer.reset()
//   } else {
//     timer.stop()
//   }
// })
// // 监听浮动更改
// watch(() => p.hiddenTime, () => {
//   timer.time = p.hiddenTime
//   timer.reset()
// }, {
//   immediate: true,
// })
</script>

<template>
  <div class="ce-scroll-frame">
    <div ref="mainEl" :class="{['ce-scroll-x-' + stateX]: true, ['ce-scroll-y-' + stateY]: true}"
         class="ce-scroll-main"
         @scroll="emit('scroll', $event)">
      <slot></slot>
    </div>
    <transition>
      <div v-show="showY" ref="barYEl" class="ce-scroll-y-bar">
        <div ref="thumbYEl" :class="{'ce-active': downX}" class="ce-scroll-y-thumb"></div>
      </div>
    </transition>
    <transition>
      <div v-show="showX" ref="barXEl" class="ce-scroll-x-bar">
        <div ref="thumbXEl" :class="{'ce-active': downY}" class="ce-scroll-x-thumb"></div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.ce-scroll-frame {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
<script lang="ts">
export default { name: 'CeScrollOver' }
</script>