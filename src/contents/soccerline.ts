import { doc, getDoc, setDoc } from "firebase/firestore"
import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

import { db } from "~background"
import { activateSlashKeyOnCoupang } from "~content/coupang"
import { activateKeywordTrackerOnSoccerline } from "~content/tracker"

export const config: PlasmoCSConfig = {
  // matches: ["<all_urls>"],
  matches: ["https://soccerline.kr/*", "https://www.coupang.com/*"],
  all_frames: true
}

export {}
async function main() {
  console.log("PLASMO content.ts script")
  // const auth = await sendToBackground({
  //   name: "getAuth",
  //   body: {}
  // })
  // console.log("content.ts auth", auth)

  const result = await sendToBackground({
    name: "getSetting",
    body: {}
  })
  // console.log("🚀 ~ main ~ getSetting result:", result)

  const host = window.location.host

  if (result && result.status === "success") {
    if (
      host === "www.coupang.com" &&
      result.setting.coupangSearchFocusHelperEnabled === true
    ) {
      activateSlashKeyOnCoupang()
    }
    if (
      host === "soccerline.kr" &&
      result.setting.soccerlineKeywordLoggerEnabled === true
    ) {
      // console.log(pathname);
      const keywordResult = await sendToBackground({
        name: "getKeyword",
        body: {
          host: "soccerline.kr"
        }
      })
      if (
        keywordResult &&
        keywordResult.status === "success" &&
        keywordResult.data.length > 0
      ) {
        // console.log("🚀 ~ main ~ getKeyword result:", keywordResult)
        activateKeywordTrackerOnSoccerline(keywordResult.data)
      }
    }
  } else {
    // console.log("setting not loaded")
  }
}

main()
