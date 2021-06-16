import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1_WTqcNEJGU-Al5BjSC3-2Ac7QsZyjBs",
    authDomain: "el-proyectito-milibro-web.firebaseapp.com",
    projectId: "el-proyectito-milibro-web",
    storageBucket: "el-proyectito-milibro-web.appspot.com",
    messagingSenderId: "150239240570",
    appId: "1:150239240570:web:ee74dbd495cf44cbe5b6c3"
  };


export default firebase.initializeApp(firebaseConfig);


// const firebase = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// export default {
//   firebase,
//   bd
// }



// const fireApp = firebase.initializeApp(firebaseConfig);
// export default fireApp.database();