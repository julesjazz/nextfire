```jsx

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Uo5HMvrGLBnJ1HH1VTokjSMoFvczyHA",
  authDomain: "nextfire-jsjazz.firebaseapp.com",
  projectId: "nextfire-jsjazz",
  storageBucket: "nextfire-jsjazz.appspot.com",
  messagingSenderId: "751482083336",
  appId: "1:751482083336:web:263f2ee4d20f613e6699bd",
  measurementId: "G-RWTGQ7YR5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

```