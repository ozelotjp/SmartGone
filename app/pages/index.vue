<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="link in links" :key="link" :to="link">
                  <v-list-item-content>
                    {{ link }}
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
import { createComponent } from '@vue/composition-api'

export default createComponent({
  middleware: 'authenticated',
  setup() {
    const links = ['/auth/signin', '/auth/signout']
    return {
      links
    }
  }
})
</script>
