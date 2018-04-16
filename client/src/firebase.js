import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDh8x44zfYFxpjks-jD6tv16rNoOIdWJL4",
  authDomain: "redux-68857.firebaseapp.com",
  databaseURL: "https://redux-68857.firebaseio.com",
  projectId: "redux-68857",
  storageBucket: ""
  //messagingSenderId: "401775801761"
};

firebase.initializeApp(config);

export default firebase;