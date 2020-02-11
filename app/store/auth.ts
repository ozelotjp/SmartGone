import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  id: '' as string,
  email: '' as string
})

export const getters = getterTree(state, {
  id: (state) => state.id,
  email: (state) => state.email,
  authenticated: (state) => state.id !== ''
})

export const mutations = mutationTree(state, {
  setId(state, newValue: string) {
    state.id = newValue
  },
  setEmail(state, newValue: string) {
    state.email = newValue
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    initialaise({ commit }) {
      commit('setId', '')
      commit('setEmail', '')
    },
    setAccount({ commit }, newAccount: firebase.User) {
      commit('setId', newAccount.uid)
      commit('setEmail', newAccount.email || '')
    }
  }
)
