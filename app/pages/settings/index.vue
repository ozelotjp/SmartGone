<template>
  <v-container>
    <v-row>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  middleware: 'authenticated'
})
</script>
