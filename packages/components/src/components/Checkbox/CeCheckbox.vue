<script lang="ts" setup>
import CeCheckboxSlot from '@c/components/Checkbox/CheckboxSlot.vue'
import { deepFocus } from '@c/hooks/depthFocus'
import inputPub from '@c/hooks/input'
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
  emit('update:modelValue', !p.modelValue)
  const ie = new InputEvent('input', {
    data: p.value,
  })
  emit('input', ie)
}

inputPub(inputEl, emit, e => (e.target as HTMLInputElement).checked)

defineExpose({
  isFocus,
  focus,
  blur,
})

</script>

<template>
  <span ref="rootEl" :class="{'ce-focus': isFocus, 'ce-checked': modelValue}"
        class="ce-checkbox"
        tabindex="99999"
        @click="click"
        @change="">
    <span class="ce-icon-box ce-form-element">
      <slot :checked="modelValue" name="icon">
        <CeCheckboxSlot :checked="modelValue" />
      </slot>
      <input ref="inputEl" :value="value" :checked="modelValue" :name="name" type="checkbox"/>
    </span>
    <span v-if="value !== undefined" class="ce-value">
      <slot :value="value">{{ value }}</slot>
    </span>
  </span>
</template>

<style lang="scss" scoped>
@import "@c/assets/checkbox.scss";
.ce-checkbox {
  border-radius: var(--ce-border-radius-min);

  .ce-icon-box {
    border-radius: var(--ce-border-radius-min);
  }
}
</style>
<script lang="ts">
export default { name: 'CeCheckbox' }
</script>