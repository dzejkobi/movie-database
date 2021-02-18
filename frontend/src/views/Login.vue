<template lang="html">
  <div class="container">
    <Form ref="loginForm" class="login-form" @submit="authenticate">
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
               :rules="isRequired" />
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
               :rules="isRequired" />
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
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: 'Login',
  meta: {
    title: 'Login'
  },

components: {
    Field,
    Form,
    ErrorMessage,
  },

  data () {
    return {
      username: '',
      password: '',
      globalErrors: '',
    }
  },

  methods: {
    authenticate () {
      const payload = {
        username: this.username,
        password: this.password
      }

      this.globalErrors = ''
      
      axios.post(this.$store.state.endpoints.obtainJWT, payload)
        .then( response => {
          this.$store.commit('updateToken', response.data.token)
          this.$store.dispatch('pullAuthUserData')
          this.$router.push({name: 'Home'})
        })
        .catch( error => {
          if (error.response.status == 400) {
            let errors = {}

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
    },

    isRequired (value) {
      return (value && value.trim()) ? true : 'This field is required';
    }
  }
}
</script>


<style lang="css">
.login-form {
  margin: 0 auto;
  max-width: 400px;
}
</style>
