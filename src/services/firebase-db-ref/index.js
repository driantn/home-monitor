import firebase from '@firebase/app';
import '@firebase/database';
import firebaseConfig from 'base/config/fb-config';

const fbApp = firebase.initializeApp(firebaseConfig);
const dbRef = fbApp.database().ref(`monitor-data`);
export default dbRef;