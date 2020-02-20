<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert type="info">
          現在 {{ state.lengthok }}/{{ state.length }}人 がこの教室にいます
        </v-alert>
        <v-simple-table>
          <tbody>
            <tr
              v-for="(user, index) in state.users"
              :key="index"
              :class="state.location !== user.location ? 'orange' : ''"
            >
              <th>#{{ index + 1 }}</th>
              <td>
                {{ user.name }}
              </td>
              <td>
                {{ user.location }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { UserDocument } from '@/types/firestore'

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      users: [] as UserDocument[],
      length: 0,
      lengthok: 0,
      location: ''
    })

    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .get()
      .then((snapshot) => {
        const user = snapshot.data() as UserDocument
        state.location = user.location
      })

    $firebase
      .firestore()
      .collection('users')
      .onSnapshot((snapshot) => {
        state.length = 0
        state.lengthok = 0
        snapshot.forEach((snapshot) => {
          const user = snapshot.data() as UserDocument
          state.users.push(user)
          state.length++
          if (user.location === state.location) {
            state.lengthok++
          }
        })
      })

    return {
      state
    }
  }
})
</script>
