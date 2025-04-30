import { getAuth } from "firebase/auth/web-extension"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { firebase_app } from "~background"

// import { auth } from "~firebase/firebaseClient"

// import { fetchUserData } from "~firebase/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const auth = getAuth(firebase_app)
  console.log("🚀 ~ auth.currentUser:", auth.currentUser)

  const result = { status: null, user: null, error: null }

  if (auth && auth.currentUser) {
    result.status = "success"
    result.user = auth.currentUser
  } else {
    result.status = "error"
    result.error = "No signed in user found"
  }
  res.send(result)
}

export default handler
