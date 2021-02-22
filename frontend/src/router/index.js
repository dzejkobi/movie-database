import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Landing page' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: 'Log in' }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: { title: 'Sign up' }
  },
  {
    path: '/browse-movies',
    name: 'BrowseMovies',
    component: () => import('../views/BrowseMovies.vue'),
    meta: { title: 'Browse movies' }
  },
  {
    path: '/movie-details/:imdbID',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetails.vue'),
    meta: { title: 'Movie details' }
  },
  {
    path: '/favourite-movies',
    name: 'FavouriteMovies',
    component: () => import('../views/FavouriteMovies.vue'),
    meta: { title: 'Favourite movies' }
  }
]

const restrictedRoutes = [
  'BrowseMovies', 'MovieDetails', 'FavouriteMovies'
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let title = 'Movie Database'
  const subtitle = to.meta.title || to.name || null

  if (restrictedRoutes.includes(to.name) && !store.state.isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  if (subtitle) {
    title = `${subtitle} | ${title}`
  }
  document.title = title

  next()
})

export default router
