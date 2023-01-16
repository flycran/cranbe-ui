<script lang="ts" setup>
const { modelValue } = defineProps<{
  modelValue: string | number
}>()
const emit = defineEmits<{
  /** 输入框的值 */
  (e: 'update:modelValue', v: InputEvent): void
}>()

function input(e: InputEvent) {
  emit('update:modelValue', e)
}

</script>

<template>
  <span class="ce-form-element">
    <input :value="modelValue.toString()" @input="input"/>
  </span>
</template>

<style lang="scss" scoped>
</style>
<script lang="ts">
export default { name: 'CeInput' }
</script>