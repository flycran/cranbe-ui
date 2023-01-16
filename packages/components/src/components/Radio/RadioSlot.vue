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
      <CeIcon type="circular"/>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ce-slot {
  width: 100%;
  height: 100%;
  color: var(--ce-type-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script lang="ts">
export default { name: 'CeRadioSlot' }
</script>