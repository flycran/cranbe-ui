<script lang="ts" setup>
import CeIcon from '@c/components/Icon/CeIcon.vue'
import CeInputSuggest from '@c/components/Tool/CeInputSuggest.vue'
import { deepFocus } from '@c/hooks/depthFocus'
import { CallBack, InteriorEach } from '@c/hooks/interiorEach'
import { IconTypeString } from '@c/index'
import { delayPrint } from '@p/utils'
import { ref, watch } from 'vue'

const p = withDefaults(defineProps<{
  modelValue: any
  options?: any[]
  prefixIcon?: IconTypeString
  keyName?: string | number | true
  getter?: CallBack
  setter?: CallBack
  proxy?: CallBack
  find?: CallBack
  updateSuggest?: (input: any) => void | any[] | Promise<any[]>
  suggestWhenOpen?: boolean
  delay?: number
}>(), {
  delay: 500,
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void

  (e: 'update:options', v: any[]): void

  (e: 'input', v: InputEvent): void

  (e: 'change', v: InputEvent): void

  (e: 'focus', v: FocusEvent): void

  (e: 'blur', v: FocusEvent): void

  (e: 'insert', v: any): void
}>()

const selected = ref()

const ie = new InteriorEach(p)
const find = (e: any) => p.find ? p.find(e) : (p.options && p.options.find((a) => ie.setter(a) === e))

function select(e: any) {
  value.value = e
  emit('update:modelValue', e)
  showOp.value = false
}

const rootEl = ref<HTMLElement>()

const proxyEmit = <T extends keyof typeof emit>(e: T, v: (typeof emit)[T]) => {
  if(e === 'blur') open(false)
  emit(e, v)
}

const showOp = ref(false)

const { isFocus, focus, blur } = deepFocus(rootEl, proxyEmit)

function input(e: InputEvent) {
  showOp.value = true
  suggest()
  emit('input', e)
  value.value = (e.target as HTMLInputElement).value
}

watch(() => p.modelValue, (v) => {
  selected.value = find(v)
})

function change(e: InputEvent) {
  emit('change', e)
}

function open(bool = !showOp.value) {
  showOp.value = bool
  if(bool && p.suggestWhenOpen) {
    suggestIn()
  }
}

const loading = ref(false)

const value = ref('')

const suggestIn = () => {
  if(!p.updateSuggest) return
  const res = p.updateSuggest(value.value)
  if(res instanceof Promise) {
    loading.value = true
    res.then((e) => {
      loading.value = false
      emit('update:options', e)
    })
  } else if(res !== undefined) {
    emit('update:options', res)
  }
}

const suggest = delayPrint(suggestIn, p.delay)

defineExpose({
  isFocus,
  focus,
  blur,
})
</script>

<template>
  <span ref="rootEl"
        :class="{'ce-focus': isFocus, 'show-option': showOp}"
        class="ce-select ce-form-element"
        tabindex="99999">
    <span v-if="prefixIcon || $slots.prefix" class="ce-prefix">
      <slot name="prefix">
        <CeIcon :type="prefixIcon"/>
      </slot>
    </span>
    <input :readonly="!updateSuggest" :value="value" class="ce-input"
           @change="change" @input="input" @keydown.enter="blur"/>
    <span class="ce-suffix" @click="open()">
      <CeIcon type="to-down"/>
    </span>
    <CeInputSuggest :getter="getter"
                    :key-name="keyName"
                    :loading="loading"
                    :options="options"
                    :proxy="proxy"
                    :select="select"
                    :setter="setter"
                    :show="showOp">
      <template v-if="$slots.default" v-slot="{index, item}">
        <slot :index="index" :item="item"></slot>
      </template>
    </CeInputSuggest>
  </span>
</template>

<style lang="scss" scoped>
.ce-select {
  width: var(--ce-input-width);
  height: var(--ce-input-height);
  display: inline-flex;
  position: relative;
  cursor: pointer;
  --ce-icon-size: 1.25em;

  .ce-prefix, .ce-suffix {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ce-suffix {
    cursor: pointer;

    .ce-icon {
      transition: transform 0.3s;

      .ce-icon {
        font-size: var(--ce-icon-size);
      }
    }
  }

  &.show-option .ce-icon {
    transform: rotate(180deg);
  }

  &.ce-show-prefix input {
    padding-left: 0;
  }

  .ce-input {
    padding-right: 0;
  }
}
</style>
<script lang="ts">
export default { name: 'CeSelect' }
</script>