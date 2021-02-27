import axios from 'axios'
import endpoints from '@/common/endpoints'
import router from '@/router'

// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  namespaced: true,
  state: {
    userData: {},
    isAuthenticated: false,
    jwtToken: localStorage.getItem('jwtToken')
  },

  getters: {
    axiosCfg: state => {
      const headers = {
        'Content-Type': 'application/json'
      }

      if (state.jwtToken) {
        headers.Authorization = `JWT ${state.jwtToken}`
      }

      return {
        baseURL: endpoints.backend,
        headers: headers,
        xhrFields: {
          withCredentials: true
        }
      }
    }
  },

  mutations: {
    setAuthUser (state, userData) {
      state.userData = userData
      state.isAuthenticated = true
    },
    updateToken (state, newToken) {
      localStorage.setItem('jwtToken', newToken)
      state.jwtToken = newToken
      state.isAuthenticated = true
    },
    unsetAuthUser (state) {
      localStorage.removeItem('jwtToken')
      state.jwtToken = null
      state.userData = {}
      state.isAuthenticated = false
    }
  },

  actions: {
    async signedRequest (context, config) {
      const axiosInstance = axios.create(context.getters.axiosCfg)

      return axiosInstance(config)
    },

    async pullAuthUserData (context) {
      if (!context.state.jwtToken) {
        return
      }

      return context.dispatch(
        'signedRequest',
        { url: endpoints.currUserData, method: 'get' }
      ).then(response => {
        context.commit('setAuthUser', response.data)
      }).catch(error => {
        if (error.response.status === 401) {
          context.commit('unsetAuthUser')
          router.push({ name: 'Login' })
          return Promise.resolve(error)
        }
      })
    }
  }
}
