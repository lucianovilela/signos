import { initializeApp } from 'firebase/app';



import { getAnalytics, logEvent } from "firebase/analytics";


// Initialize Firebase
const firebaseConfig =  {
    "apiKey": "AIzaSyD03tfMzN7KtNrydxx73ScCDeuXhpDjZdg",
    "authDomain": "ehatdig.firebaseapp.com",
    "databaseURL": "https://ehatdig.firebaseio.com",
    "projectId": "ehatdig",
    "storageBucket": "ehatdig.appspot.com",
    "messagingSenderId": "1029709563969",
    "appId": "1:1029709563969:web:5d30e69e09ad2c75259ec0"
};

const app = initializeApp(firebaseConfig);
const analytics =  getAnalytics(app); 
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const publishEvent=(obj, param)=>logEvent(analytics, obj, param);

export  { app, analytics, publishEvent };