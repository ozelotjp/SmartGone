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
