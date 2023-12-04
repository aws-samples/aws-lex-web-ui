import { createRouter, createWebHistory } from 'vue-router'
import LexWeb from '../components/LexWeb.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LexWeb',
      component: LexWeb
    }
  ]
})

export default router
