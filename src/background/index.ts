// chrome.scripting.executeScript(
//   {
//     target: {
//       tabId // the tab you want to inject into
//     },
//     world: "MAIN", // MAIN to access the window object
//     func: windowChanger // function to inject
//   },
//   () => {
//     console.log("Background script got callback after injection")
//   }
// )

import { getApps, initializeApp } from "firebase/app"

const clientCredentials = {
  apiKey: process.env.PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PLASMO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PLASMO_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let firebase_app

// Check if firebase app is already initialized to avoid creating new app on hot-reloads
if (!getApps().length) {
  firebase_app = initializeApp(clientCredentials)
} else {
  firebase_app = getApps()[0]
}

export { firebase_app }

// console.log("background index", auth.currentUser)
// auth.onAuthStateChanged((user) => {
//   console.log("background script onAuthStateChanged user", user)
// })
