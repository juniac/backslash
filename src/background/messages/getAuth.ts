import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { auth } from "~firebase/firebaseClient"

// import { fetchUserData } from "~firebase/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("background getAuth")

  const result = { status: null, user: null, error: null }

  if (auth && auth.currentUser) {
    result.status = "success"
    result.user = auth.currentUser
  } else {
    result.status = "error"
    result.error = "No signed inuser found"
  }
  res.send(result)
}

export default handler
