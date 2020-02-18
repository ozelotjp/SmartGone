<template>
  <v-app>
    <v-app-bar app>
      <v-icon>
        mdi-domain
      </v-icon>
      <v-toolbar-title to="/">
        HAL名古屋
      </v-toolbar-title>
      <v-spacer />
      <v-btn text>
        <v-icon>
          mdi-map-marker
        </v-icon>
        {{ state.location }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="primary lighten-1" app>
      <v-tabs
        background-color="primary lighten-1"
        centered
        active-class="primary lighten-2"
        dark
        icons-and-text
        hide-slider
      >
        <v-tab to="/">
          home
          <v-icon>
            mdi-home
          </v-icon>
        </v-tab>
        <v-tab to="/touch">
          touch
          <v-icon>
            mdi-credit-card-scan
          </v-icon>
        </v-tab>
        <v-tab to="/other">
          other
          <v-icon>
            mdi-menu
          </v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      location: '' as string
    })

    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists === false) {
          return
        }
        state.location = snapshot.data()!.location
      })

    return {
      state
    }
  }
})
</script>
