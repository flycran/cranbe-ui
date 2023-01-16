<script lang="ts" setup>
import { RouteLocationRaw, useRouter } from 'vue-router'

const router = useRouter()

const { to, replace, type } = defineProps<{
  /** 路由 */
  to?: RouteLocationRaw
  /** 替换 */
  replace?: boolean
  /** 类型 */
  type?: string
}>()
const emit = defineEmits<{
  (e: 'click', v: MouseEvent): void
}>()

function click(e: MouseEvent) {
  emit('click', e)
  if(to) {
    if(replace) {
      router.replace(to)
    } else {
      router.push(to)
    }
  }
}
</script>

<template>
  <span :class="'ce-type-' + type" :replace="replace" :to="to" class="ce-link"
        @click="click($event)">
    <slot/>
  </span>
</template>

<style lang="scss" scoped>
.ce-link {
  transition: color var(--ce-transition-duration);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:hover {
    color: var(--ce-type-default-active);
  }

  &.ce-type-primary {
    color: var(--ce-type-primary);

    &:hover {
      color: var(--ce-type-primary-active);
    }
  }

  &.ce-type-success {
    color: var(--ce-type-success);

    &:hover {
      color: var(--ce-type-success-active);
    }
  }

  &.ce-type-info {
    color: var(--ce-type-info);

    &:hover {
      color: var(--ce-type-info-active);
    }
  }

  &.ce-type-warning {
    color: var(--ce-type-warning);

    &:hover {
      color: var(--ce-type-warning-active);
    }
  }

  &.ce-type-danger {
    color: var(--ce-type-danger);

    &:hover {
      color: var(--ce-type-danger-active);
    }
  }
}
</style>
<script lang="ts">
export default { name: 'CeLink' }
</script>