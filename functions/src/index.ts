/* eslint-disable */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const server = functions.region('asia-northeast1')
admin.initializeApp()

exports.onTouch = server.https.onRequest((request, response) => {
  if (
    typeof request.query.id === 'undefined' ||
    typeof request.query.idm === 'undefined'
  ) {
    response.json({ status: 'error' })
    return
  }

  admin
    .firestore()
    .collection('terminals')
    .doc(request.query.id)
    .get()
    .then((terminalRecord) => {
      if (terminalRecord.exists === false) {
        response.json({ status: 'error' })
        return
      }

      admin
        .firestore()
        .collection('cards')
        .doc(request.query.idm)
        .get()
        .then((cardRecord) => {
          if (cardRecord.exists === false) {
            response.json({ status: 'error' })
            return
          }
          admin
            .firestore()
            .collection('check')
            .doc(cardRecord.data().user)
            .set({
              date: admin.firestore.FieldValue.serverTimestamp(),
              location: terminalRecord.data().location,
              type: terminalRecord.data().type
            }).catch(() => {
              response.json({ status: 'error' })
              return
            })
        }).catch(() => {
          response.json({ status: 'error' })
          return
        })
    }).catch(() => {
      response.json({ status: 'error' })
      return
    })

  response.end()
  return
})
