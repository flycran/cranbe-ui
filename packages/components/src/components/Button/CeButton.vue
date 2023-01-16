<script lang="ts" setup>
const p = withDefaults(defineProps<{
  /** 类型 */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}>(), {
  type: 'primary',
})
const emit = defineEmits<{
  /** 点击事件 */
  (e: 'click', v: MouseEvent): void;
}>()
</script>

<template>
  <button :class="'ce-type-' +p.type" class="ce-button" @click="emit('click', $event)">
    <span class="ce-button-left">
      <slot name="left"></slot>
    </span>
    <span class="ce-button-text">
      <slot></slot>
    </span>
    <span class="ce-button-right">
      <slot name="right"></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.ce-button {
  color: #f0f0f0;
  padding: 8px 16px;
  transition: background-color var(--ce-transition-duration);
  cursor: pointer;
  margin-right: 8px;
  border-radius: var(--ce-border-radius);
  background-color: var(--ce-type-default);
  height: var(--ce-input-height);

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: var(--ce-type-default-active);
  }

  &.ce-type-primary {
    background-color: var(--ce-type-primary);

    &:hover {
      background-color: var(--ce-type-primary-active);
    }
  }

  &.ce-type-success {
    background-color: var(--ce-type-success);

    &:hover {
      background-color: var(--ce-type-success-active);
    }
  }

  &.ce-type-info {
    background-color: var(--ce-type-info);

    &:hover {
      background-color: var(--ce-type-info-active);
    }
  }

  &.ce-type-warning {
    background-color: var(--ce-type-warning);

    &:hover {
      background-color: var(--ce-type-warning-active);
    }
  }

  &.ce-type-danger {
    background-color: var(--ce-type-danger);

    &:hover {
      background-color: var(--ce-type-danger-active);
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeButton' }
</script>