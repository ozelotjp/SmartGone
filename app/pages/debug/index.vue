<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item"
                >
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
import { createComponent } from '@vue/composition-api'

export default createComponent({
  setup() {
    const items = ['/debug/terminal']

    return {
      items
    }
  }
})
</script>
