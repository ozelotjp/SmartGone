<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          ログイン
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field
            v-model="field.email"
            label="メールアドレス"
            type="text"
          />
          <v-text-field
            v-model="field.password"
            label="パスワード"
            type="password"
          />
          <v-btn :loading="button.loading" @click="signin()">
            ログイン
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import Swal from 'sweetalert2'

export default createComponent({
  layout: 'guest',
  setup(_, { root: { $firebase, $router } }) {
    const field = reactive({
      email: 'example@ozelot.app',
      password: 'password'
    })
    const button = reactive({
      loading: false
    })

    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        return
      }
      $router.push('/')
    })

    function signin() {
      button.loading = true
      $firebase
        .auth()
        .signInWithEmailAndPassword(field.email, field.password)
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: 'メールアドレスまたはパスワードが違います',
            icon: 'error'
          })
        })
        .finally(() => {
          button.loading = false
        })
    }

    return {
      field,
      button,
      signin
    }
  }
})
</script>
