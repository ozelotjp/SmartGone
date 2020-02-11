import { getAccessorType } from 'nuxt-typed-vuex'

import * as auth from './auth'

export const accssorType = getAccessorType({
  modules: {
    auth
  }
})
