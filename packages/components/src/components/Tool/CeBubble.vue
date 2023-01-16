<script lang="ts" setup>
import { SuspensionDirection } from '@c/components/Tool/types'

const p = withDefaults(defineProps<{
  direction?: SuspensionDirection
}>(), {
  direction: 'bottom',
})
const emit = defineEmits<{
}>()
</script>

<template>
  <transition :name="'ce-bubble-' + direction">
    <div :class="'ce-' + direction" class="ce-bubble">
      <div class="ce-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ce-bubble {
  position: absolute;
  cursor: default;
  width: 100%;
  box-shadow: var(--ce-card-shadow);
  border-radius: var(--ce-border-radius-min);
  z-index: 100;
  --ce-offset: 10px;

  .ce-main {
    background: var(--ce-background);
    border-radius: var(--ce-border-radius-min);
    position: relative;
    overflow: hidden;
  }

  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 0.5em;
    height: 0.5em;
    background-color: var(--ce-background);
    box-shadow: var(--ce-card-shadow);
  }
}

.ce-top, .ce-bottom {
  left: 50%;
  transform: translateX(-50%);

  &::before {
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
}

.ce-left, .ce-right {
  top: 50%;
  transform: translateX(-50%);

  &::before {
    left: 50%;
    top: translateX(-50%) rotate(45deg);
  }
}


.ce-top {
  bottom: calc(100% + var(--ce-offset));

  &::before {
    bottom: -0.25em;
  }
}

.ce-bottom {
  top: calc(100% + var(--ce-offset));

  &::before {
    top: -0.25em;
  }
}

.ce-left {
  right: calc(100% + var(--ce-offset));

  &::before {
    right: -0.25em;
  }
}

.ce-right {
  left: calc(100% + var(--ce-offset));

  &::before {
    left: -0.25em;
  }
}

.ce-bubble-bottom-enter-active,
.ce-bubble-bottom-leave-active,
.ce-bubble-top-enter-active,
.ce-bubble-top-leave-active,
.ce-bubble-left-enter-active,
.ce-bubble-left-leave-active,
.ce-bubble-right-enter-active,
.ce-bubble-right-leave-active {
  transition: opacity 0.2s;
  transition-property: opacity, transform;
}

.ce-bubble-top-enter-from,
.ce-bubble-top-leave-to {
  opacity: 0;
  transform: translate(-50%, 0.5em);
}

.ce-bubble-bottom-enter-from,
.ce-bubble-bottom-leave-to {
  opacity: 0;
  transform: translate(-50%, -0.5em);
}
</style>
<script lang="ts">
export default { name: 'CeBubble' }
</script>