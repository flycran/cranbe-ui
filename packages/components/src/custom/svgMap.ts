export const svgMap = {
  empty: () => import('./vue/Empty.vue'),
  loading: () => import('./vue/Loading.vue')
}

export type svgTypeStrings = keyof typeof svgMap