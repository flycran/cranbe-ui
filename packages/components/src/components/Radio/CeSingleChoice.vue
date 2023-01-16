<script lang="ts" setup>
import CeRadio from '@c/components/Radio/CeRadio.vue'
import { CallBack, InteriorEach } from '@c/hooks/interiorEach'

const p = defineProps<{
  modelValue: any
  name?: string
  options: any[]
  keyName?: string | number | true
  getter?: CallBack
  setter?: CallBack
  proxy?: CallBack
  find?: CallBack
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void

  (e: 'change', v: InputEvent): void
}>()

const ie = new InteriorEach(p)

const find = (e: any) => p.find ? p.find(e) : (p.modelValue === ie.setter(e))

function update(item: any, e: boolean) {
  if(e) {
    emit('update:modelValue', ie.setter(item))
  }
}
</script>

<template>
  <span class="ce-single-choice">
    <CeRadio v-for="(item, index) in options"
             :key="keyName ? (keyName === true? item : item[keyName]): index"
             :modelValue="find(item)"
             :name="name"
             :value="$slots.default ? undefined : ie.getter(item)"
             @change="emit('change', $event)"
             @update:modelValue="update(item, $event)"
    >
      <template v-if="$slots.default">
        <slot :item="item" :index="index"></slot>
      </template>
    </CeRadio>
  </span>
</template>

<style lang="scss" scoped>
.ce-single-choice {
  display: inline-block;
}
</style>
<script lang="ts">
export default { name: 'CeSingleChoice' }
</script>