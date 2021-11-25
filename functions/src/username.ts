import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export const db = admin.firestore();


// This function sets the users username in the database
// must be called with text which is the username getting set
export const createUsername = functions.https.onCall(async (data, context) => {
  // get user uid
  const userId = context.auth?.uid;
  // Create references
  const userRef = db.doc(`users/${userId}`);
  const userPrivateRef = db.doc(`users/${userId}/private/data`);
  // Data for the username to set
  const username = {
    username: data.text,
  };

  const usernameBatch = db.batch();

  usernameBatch.update(userRef, username);
  usernameBatch.update(userPrivateRef, username);

  usernameBatch.commit();
});
