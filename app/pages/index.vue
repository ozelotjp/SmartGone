<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-for="card in cards" :key="card">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  NT32
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>
                  mdi-map-marker
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                192教室
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>
                  mdi-clock
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                [4限] 15:40 ~ 17:20
              </v-list-item-content>
            </v-list-item>
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
  setup() {
    const cards = [
      {
        date: '1限',
        subject: 'JV32',
        location: '192教室'
      }
    ]
    return {
      cards
    }
  }
})
</script>
