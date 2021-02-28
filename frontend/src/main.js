import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue3-google-oauth2'

import './assets/scss/main.scss'
import { googleClientId } from '@/common/configVars'

const gAuthOptions = {
  clientId: googleClientId,
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile: false
}

createApp(App)
  .use(store)
  .use(router)
  .use(GAuth, gAuthOptions)
  .mount('#app')
