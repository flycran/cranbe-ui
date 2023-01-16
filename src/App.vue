<script lang="ts" setup>
import CeScroll from '@c/components/Scroll/CeScroll.vue'</script>
<template>
  <CeScroll y gap>
    <router-view/>
  </CeScroll>
</template>

<style lang="scss">
#app {
  box-sizing: border-box;

  .ce-scroll {
    height: 100vh;
    --ce-scroll-padding: 8px
  }
}
</style>
