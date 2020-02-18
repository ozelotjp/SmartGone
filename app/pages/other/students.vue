<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list two-line disabled class="pa-0">
            <v-list-item-group v-for="(item, index) in items" :key="index">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.subject }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.location }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    {{ item.date }}
                  </v-list-item-action-text>
                  <v-list-item-action-text>
                    {{ item.date_text }}
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < items.length" />
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
