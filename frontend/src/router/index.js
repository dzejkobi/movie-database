import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'Landing page'}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {title: 'Log in'}
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {title: 'Sign up'}
  },
  {
    path: '/browse-movies',
    name: 'BrowseMovies',
    component: () => import('../views/BrowseMovies.vue'),
    meta: {title: 'Browse movies'}
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
