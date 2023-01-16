<script lang="ts" setup>
import CeIcon from '@c/components/Icon/CeIcon.vue'

const p = defineProps<{
  checked: boolean
}>()
const emit = defineEmits<{
}>()
</script>

<template>
  <transition>
    <div v-if="checked" class="ce-slot">
      <CeIcon type="checked"></CeIcon>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ce-slot {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--ce-background);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--ce-type-primary);
}
</style>
<script lang="ts">
export default { name: 'CeCheckboxSlot' }
</script>