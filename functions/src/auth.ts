import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export const app = admin.initializeApp();
export const db = app.firestore();

export const createUserRecord = functions
    .region("europe-west1")
    .auth
    .user()
    .onCreate((user, context) => {
      const userRef = db.doc(`users/${user.uid}`);

      return userRef.set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: context.timestamp,
      });
    });
