import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCtp06-3ycRM_6secYuG0ia7crh0c6_5dg",
  authDomain: "todoist-tut-1ead6.firebaseapp.com",
  databaseURL: "https://todoist-tut-1ead6.firebaseio.com",
  projectId: "todoist-tut-1ead6",
  storageBucket: "todoist-tut-1ead6.appspot.com",
  messagingSenderId: "713037135920",
  appId: "1:713037135920:web:12ed4ff91468e9258a6df5",
});

export { firebaseConfig as firebase };
