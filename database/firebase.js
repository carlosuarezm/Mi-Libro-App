import firebase from "firebase";

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBAONigF9bfNM7vrjNqUR-8naZUFx6Rk_Y",
    authDomain: "milibro-1c33b.firebaseapp.com",
    projectId: "milibro-1c33b",
    storageBucket: "milibro-1c33b.appspot.com",
    messagingSenderId: "1039473785949",
    appId: "1:1039473785949:web:bd0d157c63c09a0f0361b4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
    firebase,
    db
  }