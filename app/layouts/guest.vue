<template>
  <v-app>
    <v-app-bar app>
      <v-icon>
        mdi-domain
      </v-icon>
      <v-toolbar-title to="/">
        HAL名古屋
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  middleware: 'non-authenticated'
})
</script>
