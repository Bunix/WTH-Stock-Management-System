<template>
  <div id="app">
    <v-app id="inspire">
      <!-- Side menu -->
      <v-navigation-drawer v-if="isAuthenticated" fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
        <v-list dense>
          <template v-for="item in items">
            <v-layout row v-if="item.heading" align-center :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children" :key="i">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" :to="`${item.link}`">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <!-- Navebar -->
      <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
        <v-toolbar-title style="width: 300px" class="ml-0">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="header-txt hidden-sm-and-down" v-text="appName"></span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <span class="hidden-sm-and-down" v-text="userEmail"></span>
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
        <v-btn flat v-for="(item) in toolbarItems" :key="item.i" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar>
      <!-- DynamicContent section -->
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'dashboard', text: 'Order dashboard', link: '/' },
      { icon: 'store', text: 'In Stock', link: '/instock' },
      { icon: 'history', text: 'History Order', link: '/history' },
      { icon: 'insert_chart_outlined', text: 'Barcode', link: '/barcode' },
      { icon: 'description', text: 'Invoice', link: '/invoice' }
    ]
  }),
  computed: {
    appName() {
      return this.$store.getters.appTitle
    },
    userEmail() {
      return this.isAuthenticated ? this.$store.getters.userEmail : []
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
          icon: 'lock_open',
          title: 'Log In',
          link: '/login'
        }
      ]
    }
  },
  methods: {
    userSignOut() {
      this.$store.dispatch('userSignOut');
    }
  },
  props: {
    source: String
  }
}
</script>

<style>
  .header-txt {
    font-size: 14px;
  }
</style>
