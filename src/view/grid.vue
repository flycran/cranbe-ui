<script lang="ts" setup>
import CeGrid from '@c/components/Grid/CeGrid.vue'
</script>

<template>
  <CeGrid :data="4" class="ass" col="2">
    <template v-slot="{item}">
      <span>{{ item }}</span>
    </template>
  </CeGrid>
</template>

<style lang="scss" scoped>
.ce-grid {
  width: 500px;
  height: 500px;
}

$w: 100px;
:deep(.ce-grid-item) {
  border: 1px solid #999;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>