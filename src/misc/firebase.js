import firebase from 'firebase/app'

const config ={
    apiKey: "AIzaSyDbzUe9BJLxKTu0SKtqjZ2PZf4nGH3xSyo",
    authDomain: "chat-web-app-91310.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/project/chat-web-app-91310/database/chat-web-app-91310-default-rtdb/data/~2F",
    projectId: "chat-web-app-91310",
    storageBucket: "chat-web-app-91310.appspot.com",
    messagingSenderId: "511176263115",
    appId: "1:511176263115:web:8166df574d11339291a24e"
};

const app = firebase.initializeApp(config)