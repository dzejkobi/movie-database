import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach ((to, from, next) => {
  let title = 'Movie Database'
  const subtitle = to.meta.title || to.name || null

  if (subtitle) {
    title = `${subtitle} | ${title}`
  }
  document.title = title

  next()
})

export default router
