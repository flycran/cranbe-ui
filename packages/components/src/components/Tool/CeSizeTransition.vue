<script lang="ts" setup>
import { reactive, ref } from 'vue'

const p = defineProps<{
  name?: string
  vertical?: boolean
}>()
const emit = defineEmits<{}>()

const size = reactive({
  width: 'auto',
  height: 'auto',
})

const mainEl = ref<HTMLElement>()

function beforeLeave() {
  size.width = mainEl.value!.offsetWidth + 'px'
  size.height = mainEl.value!.offsetHeight + 'px'
}
</script>

<template>
  <transition :name="name" @before-leave="beforeLeave">
    <div ref="mainEl"
         :class="{'ce-vertical': vertical}"
         :style="{'--ce-st-width': size.width, '--ce-st-height': size.height}"
         class="ce-size-transition">
      <slot></slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ce-size-transition {
  width: auto;
  height: auto;
}

.fold-enter-active, .fold-leave-active {
  transition: width var(--ce-transition-duration);

  &:not(.ce-vertical) {
    width: var(--ce-st-width);
  }

  &.ce-vertical {
    height: var(--ce-st-height);
  }
}

.fold-leave-to,
.fold-enter-from {
  &:not(.ce-vertical) {
    width: 0;
  }

  &.ce-vertical {
    height: 0;
  }
}
</style>
<script lang="ts">
export default { name: 'CeSizeTransition' }
</script>