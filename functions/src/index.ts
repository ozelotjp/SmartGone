/* eslint no-console: off */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

exports.onTouch = functions.https.onRequest((request, _) => {
  const idm = request.query.idm
  admin
    .firestore()
    .collection('cards')
    .doc(idm)
    .get()
    .then((snapshot) => {
      console.log(snapshot.data())
    })
    .catch((error) => {
      console.error(error)
    })
})
