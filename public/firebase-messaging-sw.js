/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDbzUe9BJLxKTu0SKtqjZ2PZf4nGH3xSyo",
    authDomain: "chat-web-app-91310.firebaseapp.com",
    databaseURL: "https://chat-web-app-91310-default-rtdb.firebaseio.com/",
    projectId: "chat-web-app-91310",
    storageBucket: "chat-web-app-91310.appspot.com",
    messagingSenderId: "511176263115",
    appId: "1:511176263115:web:8166df574d11339291a24e"
});

firebase.messaging();