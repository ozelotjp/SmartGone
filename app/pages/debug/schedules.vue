<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn :loading="button.loading" @click="run()">
          run
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

    function run() {
      button.loading = true
      $firebase
        .firestore()
        .collection('schedules')
        .add({
          timetable: 2,
          time: {
            start: $firebase.firestore.FieldValue.serverTimestamp(),
            end: $firebase.firestore.FieldValue.serverTimestamp()
          },
          location: '141教室'
        })
      $firebase
        .firestore()
        .collection('schedules')
        .add({
          timetable: 3,
          time: {
            start: $firebase.firestore.FieldValue.serverTimestamp(),
            end: $firebase.firestore.FieldValue.serverTimestamp()
          },
          location: '141教室'
        })
      $firebase
        .firestore()
        .collection('schedules')
        .add({
          timetable: 4,
          time: {
            start: $firebase.firestore.FieldValue.serverTimestamp(),
            end: $firebase.firestore.FieldValue.serverTimestamp()
          },
          location: '141教室'
        })
      $firebase
        .firestore()
        .collection('schedules')
        .add({
          timetable: 5,
          time: {
            start: $firebase.firestore.FieldValue.serverTimestamp(),
            end: $firebase.firestore.FieldValue.serverTimestamp()
          },
          location: '141教室'
        })
    }

    return {
      button,
      run
    }
  }
})
</script>
