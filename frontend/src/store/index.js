import { createStore } from 'vuex'
import axios from 'axios'


// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


export default createStore({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      obtainJWT: 'http://127.0.0.1:8000/api/v1/auth/token/obtain/',
      refreshJWT: 'http://127.0.0.1:8000/api/v1/auth/token/refresh/',
      baseUrl: 'http://127.0.0.1:8000/api/v1/'
    }
  },

  getters: {
    axiosCfg: state => {
      if (!state.jwt) {
        throw 'Missing JWT token!'
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
        url: '/users/me/',
        method: 'get',
        params: {}
      }).then( response => {
          context.commit('setAuthUser',
            {authUser: response.data, isAuthenticated: true}
          )
      })
    },

    authorizedRequest () {
      
    }
  },

  modules: {
  },
})
