/* eslint no-console: off */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

exports.onTouch = functions.https.onRequest((request, response) => {
  if (
    typeof request.query.idm !== 'undefined' &&
    typeof request.query.location !== 'undefined' &&
    typeof request.query.type !== 'undefined'
  ) {
    admin
      .firestore()
      .collection('cards')
      .doc(request.query.idm)
      .get()
      .then((snapshot) => {
        admin
          .firestore()
          .collection('check')
          .doc(snapshot.data().user)
          .set({
            date: admin.firestore.FieldValue.serverTimestamp,
            location: request.query.location,
            type: request.query.type
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  response.send('done')
})
