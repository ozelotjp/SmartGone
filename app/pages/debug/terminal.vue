<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <ul>
              <li>location: {{ state.location }}</li>
              <li>type: {{ state.type }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, index) in [
                    '校内',
                    '141教室',
                    'マルチホール',
                    '175教室',
                    '校外'
                  ]"
                  :key="index"
                  @click="updateFirestore(item)"
                >
                  <v-list-item-icon>
                    <v-icon v-if="state.location === item" color="red">
                      mdi-arrow-right
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

interface Item {
  location: string
  type: 'checkin' | 'checkpoint' | 'checkout'
}

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      location: '',
      type: ''
    })

    $firebase
      .firestore()
      .collection('terminals')
      .doc('AjeuzZDpH5FqBWVT7n5k')
      .onSnapshot((snapshot) => {
        state.location = snapshot.data()!.location
        state.type = snapshot.data()!.type
      })

    function updateFirestore(location: string) {
      const type = (() => {
        switch (location) {
          case '校内':
            return 'checkin'
          case '校外':
            return 'checkout'
          default:
            return 'checkpoint'
        }
      })()

      $firebase
        .firestore()
        .collection('terminals')
        .doc('AjeuzZDpH5FqBWVT7n5k')
        .update({
          type,
          location
        })
    }

    return {
      state,
      updateFirestore
    }
  }
})
</script>
