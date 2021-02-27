<template lang="html">
  <div class="container">
    <h1>Log in</h1>

    <Form ref="loginForm"
          class="login-form form form_centered form_narrow"
          @submit="authenticate">
      <div class="form-group">
        <label for="id_username">Username</label>
        <Field name="username"
               type="text"
               v-model="username"
               placeholder="Username"
               autofocus="autofocus"
               maxlength="150"
               id="id_username"
               class="form-control"
               :rules="isRequiredValidator" />
        <ErrorMessage name="username"
                      class="d-block mt-2 alert alert-danger" />
      </div>
      <div class="form-group">
        <label for="id_password">Password</label>
        <Field name="password"
               type="password"
               v-model="password"
               placeholder="Password"
               id="id_password"
               class="form-control"
               :rules="isRequiredValidator" />
        <ErrorMessage name="password"
                      class="d-block mt-2 alert alert-danger" />
      </div>

      <div v-if="globalErrors" class="d-block mt-2 alert alert-danger">
        {{ globalErrors }}
      </div>

      <button type="submit"
              class="btn btn-primary">
        Log In
      </button>
    </Form>
  </div>
</template>

<script>
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate'
import validators from '@/mixins/validators'
import endpoints from '@/common/endpoints'

export default {
  name: 'Login',
  mixins: [validators],
  components: {
    Field,
    Form,
    ErrorMessage
  },

  data () {
    return {
      username: '',
      password: '',
      globalErrors: ''
    }
  },

  methods: {
    authenticate () {
      const payload = {
        username: this.username,
        password: this.password
      }

      this.globalErrors = ''

      axios.post(endpoints.obtainJWT, payload)
        .then(response => {
          this.$store.commit('authStore/updateToken', response.data.token)
          this.$store.dispatch('authStore/pullAuthUserData')
          this.$router.push({ name: 'Home' })
        })
        .catch(error => {
          if (error.response.status === 400) {
            const errors = {}

            if (error.response.data.username) {
              errors.username = error.response.data.username.join('; ')
            }
            if (error.response.data.password) {
              errors.password = error.response.data.password.join('; ')
            }
            if (error.response.data.non_field_errors) {
              this.globalErrors = error.response.data.non_field_errors.join('; ')
            }
            this.$refs.loginForm.setErrors(errors)

            return Promise.resolve(error)
          }
        })
    }
  }
}
</script>
