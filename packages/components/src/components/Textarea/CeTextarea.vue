<script lang="ts" setup>
import CeIcon from '@c/components/Icon/CeIcon.vue'
import CeHandle from '@c/components/Tool/CeHandle.vue'
import CeSizeTransition from '@c/components/Tool/CeSizeTransition.vue'
import { deepFocus } from '@c/hooks/depthFocus'
import { createScrollBarY } from '@c/hooks/scroll'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import inputPub from '../../hooks/input'

const p = defineProps<{
  modelValue: string
  resize?: boolean
  rows?: number
  placeholder?: string
  maxlength?: number
  minlength?: number
  showLength?: boolean | 'fold'
  name?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void

  (e: 'input', v: InputEvent): void

  (e: 'change', v: InputEvent): void

  (e: 'focus', v: FocusEvent): void

  (e: 'blur', v: FocusEvent): void

  /** 溢出(达到最大长度后尝试输入触发) */
  (e: 'overflow', v: InputEvent): void
}>()

const rootEl = ref<HTMLElement>()
const inputEl = ref<HTMLElement>()
// 深度焦点
const { isFocus, focus, blur } = deepFocus(rootEl, emit)
// 输入组件通用
inputPub(inputEl, emit)
// 输入长度
const hiddenLength = ref(false)

const input = (e: InputEvent) => {
  if(p.maxlength && p.modelValue?.length === p.maxlength) {
    emit('overflow', e)
  }
}
// 滚动条
const bar = ref()
const thumb = ref()

const { show, down, mount, unmount } = createScrollBarY()

onMounted(() => {
  mount({
    main: inputEl.value!,
    bar: bar.value,
    thumb: thumb.value,
  })
})

onBeforeUnmount(() => {
  unmount()
})

defineExpose({
  isFocus,
  focus,
  blur,
})

</script>

<template>
  <div ref="rootEl"
       :class="{'ce-focus': isFocus, 'ce-show-bar': show}"
       class="ce-textarea ce-form-element ce-gap"
       tabindex="99999">
    <div class="ce-ov">
      <textarea ref="inputEl"
                :maxlength="maxlength"
                :minlength="minlength"
                :name="name"
                :placeholder="placeholder"
                :rows="rows"
                :value="modelValue"
                class="ce-scroll-main"
                @input="input">
      </textarea>
      <!-- 滚动条 -->
      <transition>
        <div v-show="show" ref="bar" class="ce-scroll-y-bar">
          <div ref="thumb" :class="{'ce-active': down}" class="ce-scroll-y-thumb"></div>
        </div>
      </transition>
      <!-- 字数 -->
      <div v-if="p.showLength" class="ce-length">
        <span v-if="showLength === 'fold'" class="ce-fold" @click="hiddenLength = !hiddenLength">
          <CeIcon :type="hiddenLength ? 'to-left' : 'to-right' "/>
        </span>
        <CeSizeTransition v-show="!hiddenLength" class="ce-lb" name="fold">
          <span>{{ p.modelValue ? p.modelValue.length : 0 }}</span>
          <span v-if="p.maxlength !== undefined">/{{ p.maxlength }}</span>
        </CeSizeTransition>
      </div>
      <CeHandle v-if="p.resize" :element="inputEl" resize="height">
        <div class="cls"></div>
      </CeHandle>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ce-textarea {
  width: auto;
  height: auto;
  border-radius: var(--ce-border-radius-min);
  position: relative;
  display: block;
  background-color: var(--ce-background);

  .ce-ov {
    overflow: hidden;
    position: relative;
  }

  // 主体
  textarea {
    box-sizing: border-box;
    display: block;
    min-height: var(--ce-textarea-min-height);
    max-height: var(--ce-textarea-max-height);
    width: 100%;
    height: 100%;
    resize: none;
    padding: var(--ce-input-padding);
    border: none;
    font-size: var(--ce-input-font-size);
    background-color: transparent;
  }

  // 可变尺寸
  .ce-handle {
    height: 6px;
    width: 100%;
    cursor: n-resize;
    position: absolute;
    bottom: -1px;
    left: 0;
    display: flex;
    justify-content: center;

    .cls {
      width: 50%;
      border-top: var(--ce-input-border);
      transform: translateY(2px);
    }
  }

  // 显示长度
  .ce-length {
    position: absolute;
    bottom: 0;
    height: 2em;
    overflow: hidden;
    right: 0;
    border-radius: var(--ce-border-radius-min);
    background-color: inherit;
    font-size: calc(var(--ce-input-font-size) * 0.75);
    display: flex;
    padding-right: 0.5em;

    .ce-fold {
      height: 2em;
      width: 1.25em;
      transition: color var(--ce-transition-duration);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: var(--ce-type-background);
      cursor: pointer;

      &:hover {
        color: var(--ce-type-background-active);
      }

      .ce-icon {
        color: inherit;
        font-size: 1em;
      }
    }

    .ce-lb {
      box-sizing: border-box;
      display: inline-block;
      line-height: 2em;
      height: 2em;
      overflow: hidden;
    }
  }

  // 兼容滚动条
  &.ce-show-bar {
    textarea {
      padding-right: calc(var(--ce-input-padding) + var(--ce-scroll-size));
    }

    .ce-length {
      right: var(--ce-scroll-size);
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeTextarea' }
</script>