import { Plugin } from '@nuxt/types'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAobDu5M7n_qFYf7ym2G6ffQxpI1cgN0xA',
  authDomain: 'sk31-84e56.firebaseapp.com',
  databaseURL: 'https://sk31-84e56.firebaseio.com',
  projectId: 'sk31-84e56',
  storageBucket: 'sk31-84e56.appspot.com',
  messagingSenderId: '98236006183',
  appId: '1:98236006183:web:aa10b2609cff147e4d3302'
}
firebase.initializeApp(firebaseConfig)

const myPlugin: Plugin = (_, inject) => {
  inject('firebase', firebase)
}

export default myPlugin
