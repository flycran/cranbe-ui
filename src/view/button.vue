<script lang="ts" setup>

import CeButton from '@c/components/Button/CeButton.vue'
</script>

<template>
  <CeButton>默认</CeButton>
  <CeButton type="primary">主要</CeButton>
  <CeButton type="success">成功</CeButton>
  <CeButton type="info">信息</CeButton>
  <CeButton type="warning">警告</CeButton>
  <CeButton type="danger">危险</CeButton>
</template>

<style lang="scss" scoped>
</style>
<script lang="ts">
export default { name: 'button' }
</script>