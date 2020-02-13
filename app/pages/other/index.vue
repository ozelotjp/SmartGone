<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      移動履歴
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      カード管理
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/auth/signout">
                  <v-list-item-content>
                    <v-list-item-title>
                      ログアウト
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
  middleware: 'authenticated'
})
</script>
