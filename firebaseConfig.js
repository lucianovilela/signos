import firebase  from 'firebase';

const firebaseConfig =  {
    "apiKey": "AIzaSyD03tfMzN7KtNrydxx73ScCDeuXhpDjZdg",
    "authDomain": "ehatdig.firebaseapp.com",
    "databaseURL": "https://ehatdig.firebaseio.com",
    "projectId": "ehatdig",
    "storageBucket": "ehatdig.appspot.com",
    "messagingSenderId": "1029709563969",
    "appId": "1:1029709563969:web:5d30e69e09ad2c75259ec0"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics =  firebase.analytics(); 

const publishEvent=(obj, param)=>analytics.logEvent( obj, param);

export  { app, analytics, publishEvent };