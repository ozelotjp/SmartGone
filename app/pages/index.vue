<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list two-line disabled class="pa-0">
              <v-list-item v-for="(item, index) in state.schedule" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.subject }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.location }}
                    <v-icon
                      v-if="item.location === state.nowLocation"
                      small
                      color="green"
                    >
                      mdi-check-circle
                    </v-icon>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    {{ item.date }}
                  </v-list-item-action-text>
                  <v-list-item-action-text>
                    {{ item.dateText }}
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < state.schedule.length" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

interface Schedule {
  date: string
  dateText: string
  subject: string
  location: string
}

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      nowLocation: '',
      schedule: [] as Schedule[],
      select: 2
    })

    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .get()
      .then((snapshot) => {
        state.nowLocation = snapshot.data()!.location
      })

    state.schedule = [
      {
        date: '1限',
        dateText: '09:50 ~ 11:20',
        subject: 'AP3S',
        location: '141教室'
      },
      {
        date: '2限',
        dateText: '11:35 ~ 13:05',
        subject: 'ND3S',
        location: '141教室'
      },
      {
        date: '3限',
        dateText: '13:55 ~ 15:25',
        subject: 'PM31',
        location: 'マルチホール'
      },
      {
        date: '4限',
        dateText: '15:40 ~ 17:10',
        subject: 'NT32',
        location: '175教室'
      },
      {
        date: '5限',
        dateText: '17:20 ~ 18:50',
        subject: 'NT32',
        location: '175教室'
      }
    ]

    return {
      state
    }
  }
})
</script>
