import { onBeforeUnmount, onMounted, watch } from 'vue'

export const mountedWatch = (...args: Parameters<typeof watch<any, any>>) => {
  let w: Function
  if(args[2]) {
    args[2].immediate = true
  } else {
    args[2] = { immediate: true }
  }
  onMounted(() => {
    w = watch(...args)
  })

  onBeforeUnmount(() => {
    w()
  })
}