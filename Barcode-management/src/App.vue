<template>
  <div id="app">
    <v-toolbar-title v-text="appName"></v-toolbar-title>
    <v-btn flat @click="userSignOut" v-if="isAuthenticated">
      <v-icon left>exit_to_app</v-icon>
      Sign Out
    </v-btn>
    <v-btn
      flat
      v-for="(item) in toolbarItems"
      :key="item"
      :to="item.link">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    appName() {
      return this.$store.getters.appTitle
    },
    isAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      )
    },
    toolbarItems() {
      return this.isAuthenticated ? [] : [
        {
          icon: "face",
          title: "Sign Up",
          link: "/signup"
        }, {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin"
        }
      ]
    }
  },
  methods: {
    userSignOut() {
      this.$store.dispatch("userSignOut");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  line-height: 2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
