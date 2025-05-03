import { getAuth } from "firebase/auth/web-extension"
import { doc, getDoc, setDoc } from "firebase/firestore"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { db, firebase_app } from "~background"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = { status: null, setting: null, error: null }
  const auth = getAuth(firebase_app)
  // console.log("🚀 ~ auth.currentUser:", auth.currentUser)
  if (auth && auth.currentUser) {
    console.log("content.ts getSettings", auth.currentUser.uid)
    const docSnapshot = await getDoc(doc(db, "settings", auth.currentUser.uid))
    if (docSnapshot.exists()) {
      result.status = "success"
      result.setting = docSnapshot.data()
      console.log("content.ts getSettings result", result)
    } else {
      result.error = "No Setting exists"
    }
  } else {
    result.error = "No signed in user found"
  }
  res.send(result)
  // const auth = getAuth(firebase_app)
  // console.log("🚀 ~ auth.currentUser:", auth.currentUser)

  // const result = { status: null, user: null, error: null }

  // if (auth && auth.currentUser) {
  //   result.status = "success"
  //   result.user = auth.currentUser
  // } else {
  //   result.status = "error"
  //   result.error = "No signed in user found"
  // }
  // res.send(result)
}

export default handler
