<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$auth.logout()">
          <v-list-item-title v-text="connect" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="$auth.loggedIn">
        {{ $auth.user.email }}
        <v-btn text @click="$auth.logout()">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 8}px`"
      @input="removeSnackbar(snackbar)"
    >
      {{ snackbar.text }}

      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      connect: 'logout',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapState({
      snackbars: (state) => state.snackbar.snackbars
    })
  },
  methods: {
    removeSnackbar(snackbar) {
      this.$store.dispatch('snackbar/remove', snackbar)
    }
  }
}
</script>
