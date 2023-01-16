<script lang="ts" setup>
const p = defineProps<{}>()
const emit = defineEmits<{}>()
</script>

<template>
  <tr class="ce-table-row">
    <slot>
      <td v-for="prop in publicColumn"
          :key="prop.prop"
          :class="prop.className"
          :style="prop.style"
          class="ce-table-col">
        <slot :name="prop.prop" :prop="prop.prop" :row="row">
          {{ prop.getter ? prop.getter(row) : row[prop.prop] }}
        </slot>
      </td>
    </slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CeTableRow',
  props: {
    row: {
      type: Object as PropType<{ [k: string]: any }>,
      required: true,
    },
    publicColumn: {
      type: Object as PropType<any[]>,
      default: [],
    },
  },
})
</script>