<script lang="ts" setup>
import { mountedWatch } from '@c/hooks'
import { createScrollBarX, createScrollBarY } from '@c/hooks/scroll'
import { ref } from 'vue'
import { ScrollInfo } from './index'

const p = defineProps<{
  x?: boolean
  y?: boolean
  gap?: boolean
}>()
const emit = defineEmits<{
  (e: 'scroll', v: ScrollInfo): void

  (e: 'scrollX', v: ScrollInfo): void

  (e: 'scrollY', v: ScrollInfo): void
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

</script>

<template>
  <div
      :class="{'ce-gap': gap}"
      class="ce-scroll"
  >
    <div ref="mainEl"
         :class="{['ce-scroll-x-' + stateX]: true, ['ce-scroll-y-' + stateY]: true}"
         class="ce-scroll-main">
      <slot></slot>
    </div>
    <div v-show="showY" ref="barYEl" class="ce-scroll-y-bar">
      <div ref="thumbYEl" :class="{'ce-active': downY}" class="ce-scroll-y-thumb"></div>
    </div>
    <div v-show="showX" ref="barXEl"  class="ce-scroll-x-bar">
      <div ref="thumbXEl" :class="{'ce-active': downX}" class="ce-scroll-x-thumb"></div>
    </div>
    <div class="ce-scroll-spot">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ce-scroll {
  display: grid;
  position: relative;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;

  .ce-scroll-main {
    padding: var(--ce-scroll-padding);
  }

  &.ce-scroll-frame {
    .ce-scroll-bar {
      background-color: transparent;

      .ce-scroll-thumb {
        border-radius: 99999px;
      }
    }
  }

  .ce-scroll-x-bar, .ce-scroll-y-bar {
    position: relative;
  }

  .ce-scroll-spot {
    background-color: var(--ce-scroll-bar-bc);
  }
}
</style>
<script lang="ts">
export default { name: 'CeScroll' }
</script>