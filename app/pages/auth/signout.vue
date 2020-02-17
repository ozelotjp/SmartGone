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
import Swal from 'sweetalert2'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const button = reactive({
      loading: false
    })

    function signout() {
      button.loading = true
      $firebase
        .auth()
        .signOut()
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: '不明なエラーが発生しました',
            icon: 'error'
          })
        })
        .finally(() => {
          button.loading = false
        })
    }

    $firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        return
      }
      $router.push('/')
    })

    return { button, signout }
  }
})
</script>
