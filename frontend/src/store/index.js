import { createStore } from 'vuex'
import axios from 'axios'

// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const backendUrl = process.env.VUE_APP_BACKEND_URL
const movieApiUrl = process.env.VUE_APP_MOVIE_API_URL
const omdbApiKey = process.env.VUE_APP_MOVIE_API_KEY

export default createStore({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    omdbApiKey: omdbApiKey,
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      backend: backendUrl,
      movieApi: movieApiUrl,
      obtainJWT: backendUrl + 'auth/token/obtain/',
      refreshJWT: backendUrl + 'auth/token/refresh/',
      signUp: backendUrl + 'users/',
      currUserData: backendUrl + 'users/me/',
      favourites: backendUrl + 'movies/favourites/'
    }
  },

  getters: {
    axiosCfg: state => {
      if (!state.jwt) {
        throw new Error('Missing JWT token!')
      }

      return {
        baseURL: state.endpoints.baseUrl,
        headers: {
          Authorization: `JWT ${state.jwt}`,
          'Content-Type': 'application/json'
        },
        xhrFields: {
          withCredentials: true
        }
      }
    }
  },

  mutations: {
    setAuthUser (state, { authUser, isAuthenticated }) {
      state.authUser = authUser || {}
      state.isAuthenticated = isAuthenticated || false
    },
    updateToken (state, newToken) {
      localStorage.setItem('token', newToken)
      state.jwt = newToken
    },
    removeToken (state) {
      localStorage.removeItem('token')
      state.jwt = null
      state.authUser = {}
      state.isAuthenticated = false
    }
  },

  actions: {
    pullAuthUserData (context) {
      if (!context.state.jwt) {
        return
      }

      const axiosInstance = axios.create(context.getters.axiosCfg)

      axiosInstance({
        url: this.state.endpoints.currUserData,
        method: 'get',
        params: {}
      }).then(response => {
        context.commit('setAuthUser',
          { authUser: response.data, isAuthenticated: true }
        )
      }).catch(error => {
        if (error.response.status === 401) {
          context.commit('removeToken')
          return Promise.resolve(error)
        }
      })
    }
  },

  modules: {
  }
})
