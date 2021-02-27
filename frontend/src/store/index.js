import { createStore } from 'vuex'
import authStore from './authStore'

export default createStore({
  state: {
  },

  modules: {
    authStore
  }
})
