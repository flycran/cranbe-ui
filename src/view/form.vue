<script lang="ts" setup>
import CeSelect from '@c/components/Select/CeSelect.vue'
import CeSlider from '@c/components/Slider/CeSlider.vue'
import CeText from '@c/components/Text/CeText.vue'
import CeTextarea from '@c/components/Textarea/CeTextarea.vue'
import { reactive, ref } from 'vue'

function test(e: any) {
  console.log(e)
  form.text = e
}

const form = reactive({
  text: '',
  textarea: '',
  checked: false,
  radio: false,
  select: '',
  multipleChoice: [],
  singleChoice: 0,
  range: 0,
})

const options = ref([] as any[])

for(let i = 0; i < 10; i++) {
  options.value.push({
    text: 'option' + i,
    id: i,
  })
  // options.value.push('option' + i)
}

const options1 = ref(options.value)

const suspend = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const getter = (e: any) => e.text
const setter = (e: any) => e.id
const updateSuggest = async (e: any) => {
  await suspend(1000)
  return options.value.filter((a) => {
    return a.text.includes(e)
  })
}

const op = ref([])

const insert = (e: any) => ({ text: e })
</script>
<template>
  <CeSelect v-model="form.select"
            v-model:options="op"
            :proxy="getter"
            :updateSuggest="updateSuggest">
  </CeSelect>
  <CeText v-model="form.text"
          :delay="500"
          :proxy="getter"
          :updateSuggest="updateSuggest"
          prefixIcon="search">
  </CeText>
  <CeSlider
      v-model="form.range"
      :step="10"
      show-stops
  >
  </CeSlider>
  <CeTextarea v-model="form.textarea"
              resize
              showLength="fold">
  </CeTextarea>
  <!--  <CeMultipleChoice v-model="form.multipleChoice"-->
  <!--                    :getter="e => e.text"-->
  <!--                    :options="options"-->
  <!--                    :setter="e => e.id">-->
  <!--  </CeMultipleChoice>-->
  <!--  <CeSingleChoice v-model="form.singleChoice"-->
  <!--                  :getter="e => e.text"-->
  <!--                  :options="options"-->
  <!--                  :setter="e => e.id">-->
  <!--  </CeSingleChoice>-->
</template>

<style lang="scss" scoped>
.box {
  border-top: 1px #ccc solid;
  max-height: 100%;

  :deep(.ce-scroll-main) {
    padding-right: 8px;
  }

  /*display: flex;*/
  /*align-items: center;*/
  /*flex-wrap: wrap;*/
}

.ce-slider {
  width: 600px;
}
</style>