import { activateSlashKeyOnCoupang } from "~content/coupang"
import { activateKeywordTrackerOnSoccerline } from "~content/tracker"

// import type { PlasmoCSConfig } from "plasmo"
// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   all_frames: true
// }

export {}
console.log("PLASMO content script")
function main() {
  console.log("content script loaded")
  const host = window.location.host
  // const search = window.location.search;

  if (host === "www.coupang.com") {
    activateSlashKeyOnCoupang()
  }
  if (host === "soccerline.kr") {
    // console.log(pathname);
    activateKeywordTrackerOnSoccerline()
  }
}

main()
