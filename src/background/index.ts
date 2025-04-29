import { auth } from "~firebase/firebaseClient"

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

export {}

// console.log("background index", auth.currentUser)
// auth.onAuthStateChanged((user) => {
//   console.log("background script onAuthStateChanged user", user)
// })
