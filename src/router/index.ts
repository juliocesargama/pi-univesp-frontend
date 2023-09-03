import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemsViewVue from '../views/ItemsView.vue'
import ApplicantsViewVue from '@/views/ApplicantsView.vue'
import LoansViewVue from '@/views/LoansView.vue'
import ItemsInputView from '@/views/inputs/ItemsInputView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsViewVue
    },
    {
      path: '/items/create',
      name: 'items-input',
      component: ItemsInputView
    },
    {
      path: '/applicants',
      name: 'applicants',
      component: ApplicantsViewVue
    },
    {
    path: '/loans',
      name: 'loans',
      component: LoansViewVue
    }
  ]
})

export default router
