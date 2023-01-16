<script lang="ts" setup>
import { svgMap, svgTypeStrings } from '@c/custom/svgMap'
import { defineAsyncComponent, ref } from 'vue'

const p = defineProps<{
  type: svgTypeStrings
}>()
const emit = defineEmits<{}>()

const url = ref('')
const ext = ref('')

const com = ref()


const CeComponent: any = defineAsyncComponent(svgMap[p.type])
</script>

<template>
  <component :is="CeComponent" v-if="CeComponent" class="ce-illustration"></component>
</template>

<style lang="scss" scoped>
.ce-illustration {
  display: block;
}
</style>
<script lang="ts">
export default { name: 'CeIllustration' }
</script>