<script lang="ts" setup>
import { nextTick, watch } from 'vue'

const p = defineProps<{
  /** 数组 */
  modelValue: any[]
  /** 全选 */
  all?: boolean | 0 | 1 | null
  /** 已选数组 */
  selected?: any[]
  /** 主键键名 */
  keyName?: string | number | true
  /** 选择键名 */
  selectName: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: any[]): void

  (e: 'update:selected', v: any[]): void

  (e: 'update:all', v: boolean): void
}>()

// 防循环锁
let lock = false
watch(() => p.all, (value) => {
  if(lock) return
  const newList = p.modelValue.map(item => ({
    ...item,
    [p.selectName]: value,
  }))
  emit('update:modelValue', newList)
}, {
  immediate: true,
})
watch(() => p.modelValue, () => {
  lock = true
  const value = p.modelValue.filter((e: any) => e[p.selectName])
  emit('update:selected', value)
  emit('update:all', value.length === p.modelValue.length)
  nextTick(() => {
    lock = false
  })
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <slot v-for="(item, index) in modelValue"
        :key="keyName ? (keyName === true? item : item[keyName]): index" :index="index"
        :item="item"></slot>
</template>

<style lang="scss" scoped>
.ce-depth {
}
</style>
<script lang="ts">
export default { name: 'CeDepth' }
</script>