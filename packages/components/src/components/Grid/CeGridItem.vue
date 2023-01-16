<script lang="ts" setup>
const {} = defineProps<{
}>()
const emit = defineEmits<{
  (e: 'click', v: MouseEvent): void
}>()
</script>
<template>
  <div class="ce-grid-item" @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
</style>
<script lang="ts">
export default { name: 'CeGridItem' }
</script>