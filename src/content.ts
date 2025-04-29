import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  type User
} from "firebase/auth"

// import { auth } from "~firebase/firebaseClient"

import { sendToBackground } from "@plasmohq/messaging"

import { activateSlashKeyOnCoupang } from "~content/coupang"
import { activateKeywordTrackerOnSoccerline } from "~content/tracker"

// import type { PlasmoCSConfig } from "plasmo"
// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   all_frames: true
// }

export {}
async function main() {
  console.log("PLASMO content script")
  const host = window.location.host
  // const search = window.location.search;
  if (host === "www.coupang.com") {
    activateSlashKeyOnCoupang()
  }
  if (host === "soccerline.kr") {
    // console.log(pathname);
    activateKeywordTrackerOnSoccerline()
  }

  const auth = await sendToBackground({
    name: "getAuth",
    body: {}
  })
  console.log("content.ts auth", auth)

  // onAuthStateChanged(auth, (user) => {
  //   console.log("content script onAuthStateChanged user", user)
  // })
}

main()
