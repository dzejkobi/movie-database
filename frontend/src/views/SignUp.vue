<template lang="html">
  <div class="container">
    <h1>Create new account</h1>

    <template v-if="successfullySignedUp">
      <p>
        Your new account has been successfully created.
      </p>
      <p>
        You can now <router-link :to="{ name: 'Login' }">login</router-link>.
      </p>
    </template>

    <template v-else>
      <Form ref="signUpForm" class="sign-up-form form form_centered form_narrow" @submit="submitSignUpForm">
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
          <label for="id_password1">Password</label>
          <Field name="password1"
                type="password"
                v-model="password1"
                placeholder="Password"
                id="id_password1"
                class="form-control"
                :rules="isRequired" />
          <ErrorMessage name="password1"
                        class="d-block mt-2 alert alert-danger" />
        </div>
        <div class="form-group">
          <label for="id_password2">Password (repeat)</label>
          <Field name="password2"
                type="password"
                v-model="password2"
                placeholder="Password (repeat)"
                id="id_password2"
                class="form-control"
                :rules="isRequired" />
          <ErrorMessage name="password2"
                        class="d-block mt-2 alert alert-danger" />
        </div>

        <div v-if="globalErrors" class="d-block mt-2 alert alert-danger">
          {{ globalErrors }}
        </div>

        <button type="submit"
                class="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </template>

  </div>
</template>


<script>
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: 'SignUp',
  meta: {
    title: 'Sign up'
  },

components: {
    Field,
    Form,
    ErrorMessage
  },

  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      globalErrors: '',
      successfullySignedUp: false
    }
  },

  methods: {
    submitSignUpForm () {
      const payload = {
        username: this.username,
        password1: this.password1,
        password2: this.password2
      }

      this.globalErrors = ''
      
      axios.post(this.$store.state.endpoints.signUp, payload)
        .then( response => {
          if (response.status == 201) {
            this.successfullySignedUp = true
          } else {
            this.globalErrors = `Received unexpected status: ${response.status}.`
          }
        })
        .catch( error => {
          if (error.response.status == 400) {
            let errors = {}

            for (const fieldName of ['username', 'password1', 'password2']) {
              if (error.response.data[fieldName]) {
                errors[fieldName] = error.response.data[fieldName].join('; ')
              }
            }
            if (error.response.data.non_field_errors) {
              this.globalErrors = error.response.data.non_field_errors.join('; ')
            }
            this.$refs.signUpForm.setErrors(errors)
            
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
</style>