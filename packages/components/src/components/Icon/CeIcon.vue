<script lang="ts" setup>
const { type } = defineProps<{
  type?: string
  size?: number
}>()
const emit = defineEmits<{
}>()
</script>

<template>
  <i :class="'ce-icon-' + type" class="ce-icon">
  </i>
</template>

<style lang="scss" scoped>
@import "@c/assets/iconfont.css";
.ce-icon {
  color: inherit;
  font-size: inherit;
}
</style>
<script lang="ts">
export default { name: 'CeIcon' }
</script>