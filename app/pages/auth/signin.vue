<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ログイン</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field v-model="field.email" label="メールアドレス" />
          <v-text-field v-model="field.password" label="パスワード" />
          <v-btn :loading="button.loading" @click="signin()">ログイン</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import Swal from 'sweetalert2'
import 'firebase/auth'

export default createComponent({
  setup(_, { root: { $accessor, $firebase, $router } }) {
    const field = reactive({
      email: 'private@ozelot.app',
      password: 'password'
    })
    const button = reactive({
      loading: false
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

    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        return
      }
      $accessor.auth.setAccount(user)
      $router.push('/')
    })

    return { field, button, signin }
  }
})
</script>
