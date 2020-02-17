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
import { CheckDocument, HistoryDocument } from '@/types/firestore'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    Swal.fire({
      title: 'カード読み取り中',
      html:
        'カードを端末にタッチしてください<br><a href="https://asia-northeast1-sk31-84e56.cloudfunctions.net/onTouch?id=AjeuzZDpH5FqBWVT7n5k&idm=012e3d178b509b7b" target="_blank">DEBUG</a>',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'キャンセル'
    }).finally(() => {
      $router.push('/')
    })

    const checkReference = $firebase
      .firestore()
      .collection('check')
      .doc($firebase.auth().currentUser!.uid)

    // initialize document
    checkReference.delete()

    const unsubscribe = checkReference.onSnapshot((snapshot) => {
      check(snapshot)
    })

    function check(snapshot: firebase.firestore.DocumentSnapshot) {
      if (
        snapshot.metadata.hasPendingWrites === true ||
        snapshot.exists === false
      ) {
        return
      }
      unsubscribe()
      const checkRecord = snapshot.data() as CheckDocument

      // add document
      $firebase
        .firestore()
        .collection('histories')
        .add({
          date: checkRecord.date,
          location: checkRecord.location,
          type: checkRecord.type,
          user: $firebase.auth().currentUser!.uid
        } as HistoryDocument)

      // update location
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .update({
          location: checkRecord.location
        })

      // initialize document
      checkReference.delete()

      Swal.fire({
        title: 'Success',
        html: `${checkRecord.type}に成功しました<br>（${checkRecord.location}）`,
        icon: 'success'
      }).then(() => {
        $router.push('/')
      })
    }

    return {}
  }
})
</script>
