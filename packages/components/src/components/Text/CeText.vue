<script lang="ts" setup>
import CeIcon from '@c/components/Icon/CeIcon.vue'
import { deepFocus } from '@c/hooks/depthFocus'
import { CallBack, InteriorEach } from '@c/hooks/interiorEach'
import { IconTypeString } from '@c/index'
import { delayPrint } from '@p/utils'
import { defineAsyncComponent, ref } from 'vue'
import inputPub from '../../hooks/input'

const CeInputSuggest = defineAsyncComponent(() => import('@c/components/Tool/CeInputSuggest.vue'))

const p = withDefaults(defineProps<{
  modelValue: string | number
  /** 前置 */
  prefixIcon?: IconTypeString
  suffixIcon?: IconTypeString
  placeholder?: string
  maxlength?: number
  minlength?: number
  showLength?: boolean
  /** 防抖延时 */
  delay?: number
  // 输入建议
  updateSuggest?: (input: any) => void | any[] | Promise<any[]>
  keyName?: string | number | true
  getter?: CallBack
  setter?: CallBack
  proxy?: CallBack
  find?: CallBack
}>(), {
  delay: 500,
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void

  (e: 'input', v: InputEvent): void

  (e: 'change', v: InputEvent): void

  (e: 'focus', v: FocusEvent): void

  (e: 'blur', v: FocusEvent): void
}>()

const rootEl = ref<HTMLElement>()
const inputEl = ref<HTMLElement>()

const proxyEmit = <T extends keyof typeof emit>(e: T, v: (typeof emit)[T]) => {
  if(e === 'blur') showOp.value = false
  emit(e, v)
}

const { isFocus, focus, blur } = deepFocus(rootEl, proxyEmit)

const select = (item: any) => {
  emit('update:modelValue', item)
  showOp.value = false
}

const options = ref([] as any[])

const loading = ref(false)

const suggest = delayPrint(() => {
  if(!p.updateSuggest) return
  const res = p.updateSuggest(p.modelValue)
  if(res instanceof Promise) {
    loading.value = true
    res.then((e) => {
      loading.value = false
      options.value = e
    })
  } else if(res !== undefined) {
    options.value = res
  }
}, p.delay)

inputPub(inputEl, emit, e => {
  showOp.value = true
  suggest()
  return (e.target as HTMLInputElement).value
})

const showOp = ref(false)

const interiorEach = new InteriorEach(p)

defineExpose({
  isFocus,
  focus,
  blur,
})
</script>

<template>
  <span
      ref="rootEl"
      :class="{'ce-focus': isFocus, 'ce-show-prefix': prefixIcon || $slots.prefix, 'ce-show-suffix': suffixIcon || $slots.suffix}"
      class="ce-text ce-form-element"
      tabindex="99999">
    <span v-if="prefixIcon || $slots.prefix" class="ce-prefix">
      <slot name="prefix">
        <CeIcon :type="prefixIcon"/>
      </slot>
    </span>
    <input ref="inputEl"
           :minlength="minlength"
           :placeholder="placeholder"
           :style="{paddingLeft: ''}"
           :value="modelValue.toString()"
           class="ce-input"/>
    <span v-if="suffixIcon || $slots.suffix" class="ce-suffix">
      <slot name="suffix">
        <CeIcon v-if="suffixIcon" :type="suffixIcon"/>
      </slot>
    </span>
    <CeInputSuggest v-if="updateSuggest"
                    :find="find"
                    :getter="getter"
                    :keyName="keyName"
                    :loading="loading"
                    :options="options"
                    :proxy="proxy"
                    :select="select"
                    :setter="setter"
                    :show="showOp">
      <template v-if="$slots.default" v-slot="{index,item}">
        <slot :index="index" :item="item"></slot>
      </template>
    </CeInputSuggest>
  </span>
</template>

<style lang="scss" scoped>
.ce-text {
  display: inline-flex;
  width: var(--ce-input-width);
  height: var(--ce-input-height);
  position: relative;

  --ce-icon-size: 1.25em;

  &.ce-show-prefix input {
    padding-left: 0;
  }

  &.ce-show-suffix input {
    padding-right: 0;
  }

  .ce-prefix, .ce-suffix {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;

    .ce-icon {
      font-size: var(--ce-icon-size);
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeText' }
</script>