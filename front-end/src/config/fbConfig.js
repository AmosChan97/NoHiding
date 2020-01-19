import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firbase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCnlwm5l7YXTtx-qHFVYmnXzkP2tpbfyz8",
  authDomain: "wifi-dashboard-f5060.firebaseapp.com",
  databaseURL: "https://wifi-dashboard-f5060.firebaseio.com",
  projectId: "wifi-dashboard-f5060",
  storageBucket: "wifi-dashboard-f5060.appspot.com",
  messagingSenderId: "96169388964",
  appId: "1:96169388964:web:4306074cebd4610ca2af31"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;