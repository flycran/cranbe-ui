<script lang="ts" setup>
import CeGridItem from '@c/components/Grid/CeGridItem.vue'
import { computed, reactive } from 'vue'

const p = defineProps<{
  col?: number | string
  row?: number | string
  gap?: number | string
  data?: any[] | number | string
  keyName?: string | number | true
}>()
const emit = defineEmits<{
}>()

const style = reactive({
  gridTemplateColumns: computed(() => {
    if(p.col) {
      if(!isNaN(+p.col)) {
        return `repeat(${ p.col },1fr)`
      }
      return p.col
    }
  }),
  gridTemplateRow: computed(() => {
    if(p.row) {
      if(!isNaN(+p.row)) {
        return `repeat(${ p.row },1fr)`
      }
      return p.row
    }
  }),
  gap: computed(() => {
    if(p.gap) {
      if(typeof p.gap === 'number') return p.gap + 'px'
      const ar = p.gap.split(' ')
      if(ar.length >= 2) {
        return r_gap(ar[0]) + ' ' + r_gap(ar[1])
      }
      return r_gap(p.gap)
    }
  }),
})

function r_gap(v: string | number) {
  if(!isNaN(+v)) {
    return v + 'px'
  }
  return v
}
</script>

<template>
  <div :style="style" class="ce-grid">
    <template v-if="data">
      <CeGridItem v-for="(item, index) in data"
                  :key="keyName ? (keyName === true? item : item[keyName]): index">
        <slot :item="item"/>
      </CeGridItem>
    </template>
    <slot v-else/>
  </div>
</template>

<style lang="scss" scoped>
.ce-grid {
  display: grid;
}
</style>
<script lang="ts">
export default { name: 'CeGrid' }
</script>