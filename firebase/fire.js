import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyC1_WTqcNEJGU-Al5BjSC3-2Ac7QsZyjBs",
    authDomain: "el-proyectito-milibro-web.firebaseapp.com",
    projectId: "el-proyectito-milibro-web",
    storageBucket: "el-proyectito-milibro-web.appspot.com",
    messagingSenderId: "150239240570",
    appId: "1:150239240570:web:ee74dbd495cf44cbe5b6c3"
  };

// if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);
// }  

export default firebase.initializeApp(firebaseConfig);;
// const fireApp = firebase.initializeApp(firebaseConfig);
// export default fireApp.database();