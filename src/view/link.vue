<script lang="ts" setup>
import CeLink from '@c/components/Link/CeLink.vue'
</script>
<template>
  <CeLink>默认</CeLink>
  <CeLink type="primary">主要</CeLink>
  <CeLink type="success">成功</CeLink>
  <CeLink type="info">信息</CeLink>
  <CeLink type="warning">警告</CeLink>
  <CeLink to="/button" type="danger">危险</CeLink>
</template>

<style scoped>

</style>