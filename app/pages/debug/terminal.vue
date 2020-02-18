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
                  v-for="(item, index) in items"
                  :key="index"
                  @click="updateFirestore(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.location }} / {{ item.type }}
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
  location: string | null
  type: 'checkin' | 'checkout' | 'checkpoint' | null
}

export default createComponent({
  setup(_, { root: { $firebase } }) {
    const state = reactive({
      location: null,
      type: null
    } as Item)

    const items = [
      {
        location: '校内',
        type: 'checkin'
      },
      {
        location: '175教室',
        type: 'checkpoint'
      },
      {
        location: '校外',
        type: 'checkout'
      }
    ] as Item[]

    $firebase
      .firestore()
      .collection('terminals')
      .doc('AjeuzZDpH5FqBWVT7n5k')
      .get()
      .then((snapshot) => {
        updateState({
          location: snapshot.data()!.location,
          type: snapshot.data()!.type
        })
      })

    function updateState(item: Item) {
      state.location = item.location
      state.type = item.type
    }

    function updateFirestore(item: Item) {
      $firebase
        .firestore()
        .collection('terminals')
        .doc('AjeuzZDpH5FqBWVT7n5k')
        .update({
          type: item.type,
          location: item.location
        })
        .then(() => {
          updateState({
            type: item.type,
            location: item.location
          })
        })
    }

    return {
      state,
      items,
      updateFirestore
    }
  }
})
</script>
