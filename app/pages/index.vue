<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="state.status === 'blue'" type="info">
          まもなく講義が始まります
        </v-alert>
        <v-alert v-if="state.status === 'orange'" type="warning">
          すでに講義は始まっています
        </v-alert>
        <v-simple-table>
          <thead>
            <tr>
              <th />
              <th class="text-center">
                時間
              </th>
              <th class="text-center">
                場所
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in state.schedules" :key="index">
              <td>
                <v-chip
                  :color="getStatusColor(item)"
                  :dark="!!getStatusColor(item)"
                >
                  {{ item.timetable }}限
                </v-chip>
              </td>
              <td>
                {{ formatTime(item.time.start) }}
                ~
                {{ formatTime(item.time.end) }}
              </td>
              <td>
                {{ item.location }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  onUnmounted,
  computed
} from '@vue/composition-api'
import firebase from 'firebase/app'
import { ScheduleDocument, UserDocument } from '@/types/firestore'

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      location: '',
      schedules: [] as ScheduleDocument[],
      status: '' as 'green' | 'blue' | 'orange'
    })
    const subscribeList = [] as Function[]

    const now = computed(() => {
      return $firebase.firestore.Timestamp.fromDate(
        new Date('2020/02/21 15:40:00')
      )
    })

    // listen user document
    subscribeList.push(
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .onSnapshot((snapshot) => {
          const user = snapshot.data() as UserDocument
          state.location = user.location
        })
    )

    // load schedules collection
    $firebase
      .firestore()
      .collection('schedules')
      .orderBy('timetable')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const schedule = doc.data() as ScheduleDocument
          state.schedules.push(schedule)
        })
      })

    const nextTimetable = computed(() => {
      let nextTimetable = 0
      state.schedules.forEach((schedule) => {
        if (nextTimetable !== 0) {
          return
        }
        if (now.value.seconds < schedule.time.end.seconds) {
          nextTimetable = schedule.timetable
        }
      })
      return nextTimetable
    })

    onUnmounted(() => {
      subscribeList.forEach((unsubscribe) => {
        unsubscribe()
      })
    })

    function formatTime(timestamp: firebase.firestore.Timestamp): string {
      const h = ('0' + timestamp.toDate().getHours()).slice(-2)
      const m = ('0' + timestamp.toDate().getMinutes()).slice(-2)
      return `${h}:${m}`
    }

    function getStatusColor(schedule: ScheduleDocument): string {
      // const now = $firebase.firestore.Timestamp.now()
      const now = $firebase.firestore.Timestamp.fromDate(
        new Date('2020/02/21 15:40:00')
      )

      if (schedule.timetable === nextTimetable.value) {
        if (schedule.location === state.location) {
          state.status = 'green'
          return 'green'
        }
        if (schedule.time.start.seconds > now.seconds) {
          state.status = 'blue'
          return 'blue'
        }
        state.status = 'orange'
        return 'orange'
      }
      return ''
    }

    return {
      state,
      formatTime,
      getStatusColor
    }
  }
})
</script>
