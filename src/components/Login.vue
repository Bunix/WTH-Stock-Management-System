<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-btn icon large target="_blank" slot="activator">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <form @submit.prevent="userSignIn">
              <v-flex>
                <v-alert error dismissible v-model="alert">
                  {{ error }}
                </v-alert>
              </v-flex>
              <v-text-field prepend-icon="person" name="email" label="Email" id="email" type="email" v-model="email" required></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" required></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn primary color="primary" type="submit" :disabled="loading">Sign In</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        alert: false
      }
    },
    computed: {
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.dispatch('setError', false)
        }
      }
    },
    methods: {
      userSignIn () {
        this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
      }
    }
  }
</script>

<style>

</style>


