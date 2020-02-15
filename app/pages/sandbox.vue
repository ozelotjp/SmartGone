<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          {{ state.count }}
        </v-card>
        <v-card>
          <v-btn @click="increment()">
            increment
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

export default createComponent({
  setup() {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
})
</script>
