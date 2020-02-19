<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          ログアウト
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :loading="button.loading" @click="signout()">
          ログアウト
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const button = reactive({
      loading: false
    })

    $firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        return
      }
      location.reload()
    })

    function signout() {
      button.loading = true
      $firebase
        .auth()
        .signOut()
        .finally(() => {
          button.loading = false
        })
    }

    return {
      button,
      signout
    }
  }
})
</script>
