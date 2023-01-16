import { onBeforeUnmount, onMounted, Ref } from 'vue'

export interface PublicInputProps {
  modelValue?: string | number
}

export interface PublicInputEmit {
  (e: 'update:modelValue', v: any): void

  (e: 'input', v: InputEvent): void

  (e: 'change', v: InputEvent): void
}

export default function inputPub(inputEl: Ref<HTMLElement | null | void>, emit: PublicInputEmit, beforeInput: (e: InputEvent) => any = e => (e.target as HTMLInputElement).value) {
  const ils = {
    input(e: InputEvent) {
      emit('update:modelValue', beforeInput(e))
      emit('input', e)
    },
    change(e: InputEvent) {
      emit('change', e)
    },
  }

  onMounted(() => {
    const ie = inputEl.value!
    for(const k in ils) {
      // @ts-ignore
      ie.addEventListener(k, ils[k])
    }
  })

  onBeforeUnmount(() => {
    const ie = inputEl.value!
    for(const k in ils) {
      // @ts-ignore
      ie.addEventListener(k, ils[k])
    }
  })

}