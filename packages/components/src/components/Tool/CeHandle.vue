<script lang="ts" setup>
import { Coordinate, createSlider } from '@c/hooks/slider'
import { ComponentPublicInstance, computed, onBeforeUnmount, onMounted, ref } from 'vue'

const p = withDefaults(defineProps<{
  /** 可调整大小 */
  resize?: 'width' | 'height' | 'all'
  element?: HTMLElement | ComponentPublicInstance | null
  /** 返回`true`则取消设置 */
  beforeSetSize?: (info: Coordinate) => boolean | void
  getter?: () => Partial<Coordinate> | void
  setter?: (info: Coordinate) => void
}>(), {
  resize: 'all',
  width: '10px',
})
const emit = defineEmits<{
}>()

const getter = () => {
  if(p.getter) {
    return p.getter()
  }
  const ele = element.value
  const s: any = {}
  if(!ele) return
  if(p.resize === 'all' || p.resize === 'width') {
    s.x = ele.offsetWidth
  }
  if(p.resize === 'all' || p.resize === 'height') {
    s.y = ele.offsetHeight
  }
  return s
}
const setter = (e: Coordinate) => {
  const ele = element.value
  if(!ele) return
  if(p.resize === 'all' || p.resize === 'width') {
    ele.style.width = e.x + 'px'
  }
  if(p.resize === 'all' || p.resize === 'height') {
    ele.style.height = e.y + 'px'
  }
}

onMounted(() => {
  getter()
})

const element = computed<HTMLElement>(() => {
  const ele = p.element
  if(!ele) return
  if(ele instanceof HTMLElement) return ele
  return ele.$el
})

const sliderEl = ref()

const { info, mount, unmount } = createSlider({
  getter,
  setter,
})

onMounted(() => {
  mount(sliderEl.value)
})

onBeforeUnmount(() => {
  unmount()
})

defineExpose({
  info,
})
</script>

<template>
  <div
      ref="sliderEl"
      class="ce-handle"
      @mousedown="getter">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ce-handle {
  cursor: pointer;
  user-select: none;
}
</style>
<script lang="ts">
export default { name: 'CeHandle' }
</script>