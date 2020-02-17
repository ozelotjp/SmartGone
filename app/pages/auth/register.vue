<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          ユーザ登録
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
          <v-btn :loading="button.loading" @click="register()">
            ユーザ登録
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
  middleware: 'non-authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const field = reactive({
      email: 'example@ozelot.app',
      password: 'password'
    })
    const button = reactive({
      loading: false
    })

    function register() {
      button.loading = true
      $firebase
        .auth()
        .createUserWithEmailAndPassword(field.email, field.password)
        .catch(function(error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
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
      $router.push('/')
    })

    return { field, button, register }
  }
})
</script>
