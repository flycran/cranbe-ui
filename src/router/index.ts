import { createRouter, createWebHistory } from 'vue-router'

const ps = import.meta.glob('@/view/*.vue')
const paths = []
for(const key in ps) {
  paths.push({
    path: key.slice(9, -4),
    component: ps[key],
  })
}
const routes = [
  {
    path: '',
    redirect: '/table',
  },
  ...paths,
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
