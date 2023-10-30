import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children:[
        {
          path: '',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue'),
          
        },
        {
          path: 'products/:id',
          name: 'product-detail',
          component: () => import('../views/front/detailView.vue')
        },
        
        {
          path: 'cart',
          component: () => import('../views/front/cartView.vue')
        },
        {
          path: 'form',
          component: () => import('../views/front/formView.vue')
        },
        {
          path: 'form/:id',
          component: () => import('../views/front/finalOrderView.vue')
        },
        {
          path: 'login',
          component: () =>import ('../views/front/loginView.vue')
        }
      ],
    },
    {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/adminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/adminOrders.vue')
      }
    ]
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/HomeView.vue')
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
