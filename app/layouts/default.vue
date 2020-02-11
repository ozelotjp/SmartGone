<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title to="/">
        SmartGone
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon to="/">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer v-if="authenticated" color="primary lighten-1">
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
        <v-tab to="/settings">
          settings
          <v-icon>
            mdi-settings
          </v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

export default createComponent({
  setup(_, { root: { $accessor } }) {
    const authenticated = computed(() => $accessor.auth.authenticated)
    return {
      authenticated
    }
  }
})
</script>
