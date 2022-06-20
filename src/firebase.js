import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLDsXsk80weiLFeQK9VqzZD3FV6rUwWhI",
  authDomain: "banking-system-aba06.firebaseapp.com",
  projectId: "banking-system-aba06",
  storageBucket: "banking-system-aba06.appspot.com",
  messagingSenderId: "456757321859",
  appId: "1:456757321859:web:0794bcd1b8f4572e16bbb6",
  measurementId: "G-1R87RLNNGV"
};

const fire = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export { db, fire };




// const firebaseConfig = {
//   apiKey: "AIzaSyCu8Jtau_rOL-qpTkQChJxYKu4pzefQuww",
//   authDomain: "banking-79d73.firebaseapp.com",
//   projectId: "banking-79d73",
//   storageBucket: "banking-79d73.appspot.com",
//   messagingSenderId: "228012058702",
//   appId: "1:228012058702:web:6fdb9298fd533b8c4fbb1f"
// };