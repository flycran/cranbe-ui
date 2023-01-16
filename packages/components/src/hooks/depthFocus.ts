import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'

interface Emit {
  (e: 'focus', v: FocusEvent): void

  (e: 'blur', v: FocusEvent): void
}

export function deepFocus(element: Ref<HTMLElement | null | void>, emit: Emit) {
  const isFocus = ref(false)

  let id: NodeJS.Timeout | null = null

  function focusin(e: FocusEvent) {
    if(id) {
      clearTimeout(id)
      id = null
      return
    }
    isFocus.value = true
    emit('focus', e)
  }

  function focusout(e: FocusEvent) {
    id = setTimeout(() => {
      isFocus.value = false
      emit('blur', e)
      id = null
    })
  }

  onMounted(() => {
    const e = element.value!
    e.addEventListener('focusin', focusin)
    e.addEventListener('focusout', focusout)
  })

  onBeforeUnmount(() => {
    const e = element.value!
    e.removeEventListener('focusin', focusin)
    e.removeEventListener('focusout', focusout)
  })

  return {
    isFocus,
    focus() {
      element.value?.focus()
    },
    blur() {
      element.value?.blur()
    },
  }
}