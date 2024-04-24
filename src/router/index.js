import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import WriteFormView from '../views/WriteFormView.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/write',
    name: 'write',
    component: WriteFormView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
