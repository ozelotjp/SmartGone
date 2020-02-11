import Vue from 'vue'
import { accssorType } from '@/store'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accssorType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accssorType
  }
}
