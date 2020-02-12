/* eslint-disable */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const server = functions.region('asia-northeast1')
admin.initializeApp()

exports.onTouch = server.https.onRequest((request, response) => {
  if (
    typeof request.query.idm === 'undefined' ||
    typeof request.query.location === 'undefined' ||
    typeof request.query.type === 'undefined'
  ) {
    response.json({
      status: 'error',
      description: 'no query',
      query: request.query
    })
    return
  }

  admin
    .firestore()
    .collection('cards')
    .doc(request.query.idm)
    .get()
    .then((snapshot) => {
      if (snapshot.exists === false || typeof snapshot === 'undefined') {
        response.json({
          status: 'error',
          description: 'no snapshot',
          query: request.query
        })
        return
      }
      admin
        .firestore()
        .collection('check')
        .doc(snapshot.data().user)
        .set({
          date: admin.firestore.FieldValue.serverTimestamp(),
          location: request.query.location,
          type: request.query.type
        })
        .then(() => {
          response.json({
            status: 'success',
            query: request.query
          })
        })
        .catch((error) => {
          response.json({
            status: 'exception',
            description: 'store:check',
            detailes: error,
            query: request.query
          })
        })
    })
    .catch((error) => {
      response.json({
        status: 'exception',
        description: 'store:cards',
        detailes: error,
        query: request.query
      })
    })
})
