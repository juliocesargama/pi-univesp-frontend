import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemsViewVue from '../views/ItemsView.vue'
import ApplicantsViewVue from '@/views/ApplicantsView.vue'
import LoansViewVue from '@/views/LoansView.vue'
import ItemsInputView from '@/views/inputs/ItemsInputView.vue'
import ItemsEditView from '@/views/inputs/ItemsEditView.vue'
import ApplicantsInputView from '@/views/inputs/ApplicantsInputView.vue'
import ApplicantsEditView from '@/views/inputs/ApplicantsEditView.vue'
import LoansInputView from '@/views/inputs/LoansInputView.vue'
import AboutViewVue from '@/views/AboutView.vue'

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
      component: AboutViewVue
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
      path: '/items/:id/edit',
      name: 'items-edit',
      component: ItemsEditView
    },
    {
      path: '/applicants',
      name: 'applicants',
      component: ApplicantsViewVue
    },
    {
      path: '/applicants/create',
      name: 'applicant-input',
      component: ApplicantsInputView
    },
    {
      path: '/applicants/:id/edit',
      name: 'applicants-edit',
      component: ApplicantsEditView
    },
    {
      path: '/loans',
      name: 'loans',
      component: LoansViewVue
    },
    {
      path: '/loans/create',
      name: 'loans-input',
      component: LoansInputView
    }
  ]
})

export default router
