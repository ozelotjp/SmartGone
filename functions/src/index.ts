import * as functions from 'firebase-functions'

export const helloWorld = functions.https.onRequest((_, response) => {
  response.send('Hello from Firebase!')
})
