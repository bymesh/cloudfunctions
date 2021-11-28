import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export const db = admin.firestore();

// This function sets the users username in the database
// must be called with text which is the username getting set
export const createUsername = functions
    .region('europe-west1')
    .https.onCall(async (data, context) => {
      // get user uid
      const userId = context.auth?.uid;
      // References
      const usernameRef = db.doc(`usernames/${data.text}`);
      const usernameSnapshot = usernameRef.get();
      const userRef = db.doc(`users/${userId}`);
      const userPrivateRef = db.doc(`users/${userId}/private/data`);
      // Data for the username to set
      const username = {
        username: data.text,
      };

      if (
    context.auth?.uid &&
    data.text.length > 3 &&
    data.text.length < 15 &&
    data.text.match(/^(?=[a-z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      ) {
        if (!(await usernameSnapshot).exists) {
          const usernameBatch = db.batch();
          usernameBatch.update(userRef, username);
          usernameBatch.update(userPrivateRef, username);
          usernameBatch.commit();
          usernameRef.set({uid: context.auth?.uid});
          return {
            message: 'username/succesful',
          };
        } else if ((await usernameSnapshot).exists) {
          throw new functions.https.HttpsError('unavailable', 'username/' +
       'alreadyexists');
        } else {
          throw new functions.https.HttpsError('unknown',
              'username/' + 'unknown');
          return {
            message: 'username/unknown',
          };
        }
      }
      throw new functions.https.HttpsError('unknown', 'username/' + 'unknown');
    });
