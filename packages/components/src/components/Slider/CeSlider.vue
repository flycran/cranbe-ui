<script lang="ts" setup>
import CeBubble from '@c/components/Tool/CeBubble.vue'
import { mountedWatch } from '@c/hooks'
import { createSlider } from '@c/hooks/slider'
import { limits, nearestMultiple } from '@p/utils'
import { Timer } from '@p/utils/src/timer'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const p = withDefaults(defineProps<{
  modelValue: number
  max?: number
  min?: number
  step?: number
  showStops?: boolean
  bubbleHiddenDelay?: number
  readOnly?: boolean
}>(), {
  min: 0,
  max: 100,
  step: 1,
  bubbleHiddenDelay: 1000,
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void

  (e: 'input', v: void): void

  (e: 'change', v: void): void
}>()

const thumbEl = ref<HTMLElement>()
const barEl = ref<HTMLElement>()
const activeEl = ref<HTMLElement>()

const setVal = (v: number) => {
  const c = v * 100
  thumbEl.value!.style.left = c + '%'
  activeEl.value!.style.clipPath = `inset(0 ${ 100 - c }% 0 0)`
}

const maxRange = computed(() => p.max - p.min)

mountedWatch(() => p.modelValue, (v) => {
  const b = nearestMultiple(v, p.step)
  if(!transition.value) return
  if(b != p.modelValue) return emit('update:modelValue', b)
  setVal(v / maxRange.value)
}, {
  immediate: true,
})

const stepDecimalDigits = computed(() => {
  const a = p.step.toString().split(".")[1]
  return a ? a.length : 0
})

const transition = ref(true)

let old: number = 0

const slider = createSlider({
  ondown() {
    if(p.readOnly) return true
    transition.value = false
  },
  getter() {
    return { x: thumbEl.value!.offsetLeft }
  },
  setter(c) {
    old = c.x / barEl.value!.offsetWidth
    const v = limits(old, 0, 1)
    const b = nearestMultiple(v * maxRange.value, p.step)
    setVal(v)
    if(b !== p.modelValue) {
      emit('update:modelValue', b)
      emit('input')
    }
  },
  onup() {
    const v = limits(old * maxRange.value, p.min, p.max)
    const b = nearestMultiple(v, p.step)
    setVal(b / maxRange.value)
    transition.value = true
    emit('change')
  },
})

function navigation(e: MouseEvent) {
  if(p.readOnly) return
  transition.value = false
  setVal(limits(e.offsetX / barEl.value!.offsetWidth, 0, 1))
  window.requestAnimationFrame(() => {
    slider.down(e)
    slider.move(e)
  })
}

const rootEl = ref<HTMLElement>()

function keydown(e: KeyboardEvent) {
  if(p.readOnly) return
  if(e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if(p.modelValue <= p.min) return
    emit('update:modelValue', p.modelValue - p.step)
  } else if(e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if(p.modelValue >= p.max) return
    emit('update:modelValue', p.modelValue + p.step)
  } else if(e.key === 'Enter') {
    rootEl.value!.blur()
  }
}

const { isDown } = slider

onMounted(() => {
  slider.mount(thumbEl.value!)
})

onBeforeUnmount(() => {
  slider.unmount()
})

const showOp = ref(false)
const enter = ref(false)

const timer = new Timer(() => {
  showOp.value = false
}, p.bubbleHiddenDelay)

watch([ isDown, enter ], () => {
  if(!isDown.value && !enter.value) {
    timer.reset()
  } else {
    timer.stop()
    showOp.value = true
  }
})

watch(() => p.bubbleHiddenDelay, (v) => {
  timer.time = v
})
</script>

<template>
  <span ref="rootEl" class="ce-slider" tabindex="99999" @keydown="keydown">
    <span :class="{'ce-transition': transition}" class="ce-box">
      <span ref="barEl" class="ce-bar">
        <span class="ce-ground">
          <span v-if="showStops" class="ce-step-box">
            <span v-for="i in (Math.floor(maxRange / step) - 1)" :key="i"
                  class="ce-step ce-step-ground"></span>
          </span>
        </span>
        <span ref="activeEl" class="ce-active">
          <span v-if="showStops" class="ce-step-box">
            <span v-for="i in (Math.floor(maxRange / step) - 1)" :key="i"
                  class="ce-step ce-step-active">
            </span>
          </span>
        </span>
        <span class="ce-mask" @mousedown.self="navigation"></span>
      </span>
      <span ref="thumbEl" :class="{'ce-active': isDown}" class="ce-thumb" @mouseenter="enter = true"
            @mouseleave="enter = false">
        <span class="ce-spot"></span>
        <CeBubble v-show="showOp">
          <slot name="bubble">
            <span class="ce-value">{{ modelValue.toFixed(stepDecimalDigits) }}</span>
          </slot>
        </CeBubble>
      </span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.ce-slider {
  width: var(--ce-input-width);
  height: var(--ce-input-height);
  position: relative;
  display: inline-flex;
  align-items: center;

  span {
    display: inline-block;
  }

  .ce-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex: 1;
    flex-shrink: 0;
    width: 0;
    margin: 0 calc(var(--ce-slider-thumb-size) * 0.65);

    .ce-bar {
      width: 100%;
      height: var(--ce-slider-bar-width);
      position: relative;
      cursor: pointer;
      user-select: none;

      .ce-step-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;

        .ce-step {
          width: calc(var(--ce-slider-bar-width) / 2);
          height: calc(var(--ce-slider-bar-width) / 2);
          border-radius: 99999px;
          background: var(--ce-background);
        }
      }

      .ce-ground {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: var(--ce-slider-background);
        border-radius: 99999px;
      }

      .ce-active {
        position: absolute;
        top: 0;
        left: 0;
        background: var(--ce-slider-background-active);
        width: 100%;
        height: 100%;
        border-radius: 99999px;
        background: var(--ce-slider-background-active);
      }

      .ce-mask {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }

    .ce-thumb {
      position: absolute;
      cursor: pointer;
      left: 0;
      width: var(--ce-slider-thumb-size);
      height: var(--ce-slider-thumb-size);
      transform: translateX(-50%);
      user-select: none;

      .ce-spot {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 99999px;
        width: 100%;
        height: 100%;
        background: var(--ce-background);
        border: 2px solid var(--ce-type-primary);
        box-sizing: border-box;
        transition: transform var(--ce-transition-duration);

        &:hover, &.ce-active {
          transform: scale(1.2);
        }
      }

    }

    &.ce-transition {
      .ce-active {
        transition: clip-path var(--ce-slider-transition-duration);
      }

      .ce-thumb {
        transition: left var(--ce-slider-transition-duration);
      }
    }
  }

  .ce-bubble {
    --ce-padding: 2px 8px;
    width: auto;

    .ce-value {
      padding: 2px 8px;
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeSlider' }
</script>