<template>
  <tr ref="thrEl" class="ce-table-head">
    <slot>
      <th v-for="prop in publicColumn"
          :key="prop.prop"
          :class="prop.className"
          :style="prop.style"
          class="ce-table-col">
        <slot :name="prop.prop">
          {{ prop.label }}
        </slot>
      </th>
    </slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CeTableHead',
  props: {
    publicColumn: {
      type: Object as PropType<any[]>,
      default: [],
    },
  },
})
</script>