<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          {{ nowLocation() }}
        </v-card>
        <v-card>
          <v-list two-line disabled class="pa-0">
            <v-list-item-group v-for="(item, index) in items" :key="index">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.subject }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.location }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    {{ item.date }}
                  </v-list-item-action-text>
                  <v-list-item-action-text>
                    {{ item.date_text }}
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < items.length" />
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const items = [
      {
        date: '1限',
        date_text: '09:50 ~ 11:20',
        subject: 'AP3S',
        location: '141教室'
      },
      {
        date: '2限',
        date_text: '11:35 ~ 13:05',
        subject: 'ND3S',
        location: '141教室'
      },
      {
        date: '3限',
        date_text: '13:55 ~ 15:25',
        subject: 'PM31',
        location: 'マルチホール'
      },
      {
        date: '4限',
        date_text: '15:40 ~ 17:10',
        subject: 'NT32',
        location: '175教室'
      },
      {
        date: '5限',
        date_text: '17:20 ~ 18:50',
        subject: 'NT32',
        location: '175教室'
      }
    ]

    function nowLocation() {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .get()
        .then((snapshot) => {
          return snapshot.data()!.location
        })
    }

    return {
      items,
      nowLocation
    }
  }
})
</script>
