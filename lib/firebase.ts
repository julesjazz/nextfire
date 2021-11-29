import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_Uo5HMvrGLBnJ1HH1VTokjSMoFvczyHA",
  authDomain: "nextfire-jsjazz.firebaseapp.com",
  projectId: "nextfire-jsjazz",
  storageBucket: "nextfire-jsjazz.appspot.com",
  messagingSenderId: "751482083336",
  appId: "1:751482083336:web:263f2ee4d20f613e6699bd",
  measurementId: "G-RWTGQ7YR5Q"
};

if (!firebase.apps.length) {
  // can only init fb app once, prevent next from double-running
  firebase.initializeApp(firebaseConfig)
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();