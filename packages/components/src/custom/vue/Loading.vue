<template>
  <svg class="circular ce-illustration" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" cx="25" cy="25" fill="none" r="20"></circle>
  </svg>
</template>

<script>
export default {
  name: "Loading",
}
</script>

<style scoped>
@keyframes loading-rotate {
  to {
    transform: rotate(360deg)
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px
  }
  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px
  }
}

.path {
  fill: none;
  stroke: #409EFF;
  stroke-width: 3px;
  animation: loading-dash 1.5s ease-in-out infinite;
}

svg {
  animation: loading-rotate 2s linear infinite;
}
</style>