<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Swal from 'sweetalert2'
import { CheckDocument, HistoryDocument, CardDocument } from '@/types/firestore'
import 'firebase/firestore'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $accessor, $firebase, $router } }) {
    const type = 'checkin'
    const typeMessage = 'チェックイン'
    const ref = $firebase
      .firestore()
      .collection('check')
      .doc($accessor.auth.id)
    ref.delete()
    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      check(querySnapshot)
    })

    Swal.fire({
      title: 'カード読み取り中',
      html: 'カードを端末にタッチしてください',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'キャンセル'
    }).then((result) => {
      if (typeof result.dismiss !== 'undefined') {
        $router.push('/')
      }
    })

    function check(querySnapshot: firebase.firestore.DocumentSnapshot) {
      if (
        querySnapshot.metadata.hasPendingWrites === true ||
        querySnapshot.exists === false
        // querySnapshot.data() === undefined
      ) {
        return
      }
      unsubscribe()
      ref.delete()
      const checkRecord = querySnapshot.data() as CheckDocument
      $firebase
        .firestore()
        .collection('histories')
        .add({
          date: $firebase.firestore.FieldValue.serverTimestamp(),
          type,
          user: $accessor.auth.id
        } as HistoryDocument)
      Swal.fire({
        title: 'Success',
        html: `${typeMessage}に成功しました<br>（${checkRecord.location}）`,
        icon: 'success'
      }).then(() => {
        $router.push('/')
      })
    }

    function debug() {
      const idm = 'ABCD EFGH IJKL MNOP'
      $firebase
        .firestore()
        .collection('cards')
        .doc(idm)
        .get()
        .then((querySnapshot) => {
          const cardRecord = querySnapshot.data() as CardDocument
          $firebase
            .firestore()
            .collection('check')
            .doc(cardRecord.user)
            .set({
              date: $firebase.firestore.FieldValue.serverTimestamp(),
              location: '２２３教室',
              type: 'checkin' // TODO: ここを種類によって変更する
            } as CheckDocument)
        })
    }

    return { debug }
  }
})
</script>
