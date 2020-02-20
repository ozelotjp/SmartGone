<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list subheader three-line>
          <v-subheader>
            今日のメッセージ
          </v-subheader>
          <v-list-item v-for="(message, index) in state.messages" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ message.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ message.text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { MessageDocument } from '@/types/firestore'

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      messages: [] as MessageDocument[]
    })

    // get messages
    $firebase
      .firestore()
      .collection('messages')
      .where('date', '>=', new Date('2020/02/21 00:00:00'))
      .orderBy('date', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const message = doc.data() as MessageDocument
          state.messages.push(message)
        })
      })

    function formatTime(timestamp: firebase.firestore.Timestamp): string {
      const m = ('0' + timestamp.toDate().getMonth() + 1).slice(-2)
      const d = ('0' + timestamp.toDate().getDay()).slice(-2)
      const h = ('0' + timestamp.toDate().getHours()).slice(-2)
      const i = ('0' + timestamp.toDate().getMinutes()).slice(-2)
      return `${m}/${d} ${h}:${i}`
    }

    return {
      state,
      formatTime
    }
  }
})
</script>
