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
        <v-tab to="/message">
          message
          <v-icon>
            mdi-message
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
import { createComponent, reactive, onUnmounted } from '@vue/composition-api'
import Swal from 'sweetalert2'
import { HistoryDocument } from '@/types/firestore'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      location: '' as string
    })
    const subscribeList = [] as Function[]

    // listen histories
    subscribeList.push(
      $firebase
        .firestore()
        .collection('histories')
        .where('user', '==', $firebase.auth().currentUser!.uid)
        .where('date', '<', Date.now())
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const history = change.doc.data() as HistoryDocument
            const successMessage = (() => {
              switch (history.type) {
                case 'checkin':
                  return 'チェックインが完了しました'
                case 'checkout':
                  return 'チェックアウトが完了しました'
                case 'checkpoint':
                  return 'チェックポイントを通過しました'
              }
            })()
            Swal.fire({
              title: 'Success',
              html: `${successMessage}<br>（${history.location}）`,
              icon: 'success'
            })
          })
        })
    )

    // listen location
    subscribeList.push(
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
    )

    onUnmounted(() => {
      subscribeList.forEach((unsubscribe) => {
        unsubscribe()
      })
    })

    return {
      state
    }
  }
})
</script>
