<script lang="ts" setup>
import CeCheckbox from '@c/components/Checkbox/CeCheckbox.vue'
import { InteriorEach } from '@c/hooks/interiorEach'

type CallBack = (item: any) => any

const p = defineProps<{
  modelValue: any[]
  name?: string
  options: any[]
  keyName?: string | number | true
  getter?: CallBack
  setter?: CallBack
  proxy?: CallBack
  find?: CallBack
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: any[]): void

  (e: 'change', v: InputEvent): void
}>()

const ie = new InteriorEach(p)

const find = (e: any) => p.find ? p.find(e) : (p.modelValue && p.modelValue.includes(ie.setter(e)))

function update(e: any, b: boolean) {
  const v = [ ...p.modelValue ]
  if(b) {
    v.push(ie.setter(e))
  } else {
    v.splice(v.findIndex(a => ie.setter(e) === a), 1)
  }
  emit('update:modelValue', v)
}
</script>

<template>
  <span class="ce-multiple-choice">
    <CeCheckbox v-for="(item, index) in options"
                :key="keyName ? (keyName === true? item : item[keyName]): index"
                :modelValue="find(item)"
                :name="name"
                :value="$slots.default ? undefined : ie.getter(item)"
                @change="emit('change', $event)"
                @update:modelValue="update(item, $event)"
    >
      <template v-if="$slots.default">
        <slot :index="index" :item="item"></slot>
      </template>
    </CeCheckbox>
  </span>
</template>

<style lang="scss" scoped>
.ce-multiple-choice {
  display: inline-block;
}
</style>
<script lang="ts">
export default { name: 'CeMultipleChoice' }
</script>