<script lang="ts" setup>
import CeRadioSlot from '@c/components/Radio/RadioSlot.vue'
import { deepFocus } from '@c/hooks/depthFocus'
import { ref } from 'vue'

const p = defineProps<{
  modelValue: boolean
  name?: string
  value?: any
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void

  (e: 'input', v: InputEvent): void

  (e: 'change', v: InputEvent): void

  (e: 'focus', v: FocusEvent): void

  (e: 'blur', v: FocusEvent): void
}>()

const rootEl = ref<HTMLElement>()
const inputEl = ref<HTMLInputElement>()

const { isFocus, focus, blur } = deepFocus(rootEl, emit)

function click() {
  if(!p.modelValue) {
    emit('update:modelValue', true)
    const ie = new InputEvent('input', {
      data: p.value,
    })
    emit('input', ie)
  }
}

function input() {
  if(!inputEl.value?.checked) {
    emit('update:modelValue', false)
    const ie = new InputEvent('input', {
      data: p.value,
    })
    emit('input', ie)
  }
}

defineExpose({
  isFocus,
  focus,
  blur,
})

</script>

<template>
  <span ref="rootEl" :class="{'ce-focus': isFocus, 'ce-checked': modelValue}"
        class="ce-radio"
        tabindex="99999"
        @click="click">
    <span class="ce-icon-box ce-form-element">
      <slot :checked="modelValue" name="icon">
        <CeRadioSlot :checked="modelValue"/>
      </slot>
      <input ref="inputEl" @input="" :checked="modelValue" :name="name" type="radio"/>
    </span>
    <span v-if="value !== undefined" class="ce-value">
      <slot :value="value">{{ value }}</slot>
    </span>
  </span>
</template>

<style lang="scss" scoped>
@import "@c/assets/checkbox.scss";

.ce-radio {
  border-radius: 99999px;

  .ce-icon-box {
    border-radius: 99999px;
  }
}
</style>
<script lang="ts">
export default { name: 'CeRadio' }
</script>