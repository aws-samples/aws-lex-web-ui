import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LexWeb from '@/components/LexWeb';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LexWeb',
      component: LexWeb,
    }
  ]
})

export default router
