import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRC3KMdWIoinfhgTwJp5eagQLCtAyZdMY",
  authDomain: "bt3103-week-6-1548c.firebaseapp.com",
  projectId: "bt3103-week-6-1548c",
  storageBucket: "bt3103-week-6-1548c.appspot.com",
  messagingSenderId: "863834313073",
  appId: "1:863834313073:web:5c3f85e9d5f1a4632266d0",
  measurementId: "G-T3FBEE1GPZ"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
