<script lang="ts" setup>
import CeIllustration from '@c/components/Illustration/CeIllustration.vue'
import { StateType } from '@c/components/State/index'

const p = withDefaults(defineProps<{
  tag?: string
  state?: StateType
  loading?: boolean
}>(), {
  tag: 'div',
})
const emit = defineEmits<{}>()
</script>

<template>
  <component :is="p.tag" :class="{'ce-loading': p.loading}" class="ce-state">
    <slot></slot>
    <div v-if="loading" class="ce-loading">
      <slot name="loading">
        <CeIllustration type="loading"/>
      </slot>
    </div>
    <div :class="'ce-' + state">
      <template v-if="state === 'empty'">
        <slot name="empty">
          <CeIllustration type="empty"/>
        </slot>
      </template>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.ce-state {
  position: relative;

  .ce-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ce-mask-background);
    z-index: 10;

    .ce-illustration {
      width: 3em;
      height: 3em;
    }
  }

  .ce-empty {
    .ce-illustration {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeState' }
</script>