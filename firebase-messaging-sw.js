importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyB3rdUHyZzobsUy_ELpvoQpEyH2oQrhNDc",
  authDomain: "crewlspd-b7e98.firebaseapp.com",
  projectId: "crewlspd-b7e98",
  messagingSenderId: "78627836390",
  appId: "1:78627836390:web:891eae30b3b20e86bec627"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/assets/img/logo.png'
  })
})




 