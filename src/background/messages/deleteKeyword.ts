import { getAuth } from "firebase/auth/web-extension"
import { deleteDoc, doc } from "firebase/firestore"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { db, firebase_app } from "~background"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("saveKeyword", req.body)
  const auth = getAuth(firebase_app)
  // console.log("🚀 ~ auth.currentUser:", auth.currentUser)
  if (auth && auth.currentUser) {
    try {
      const keywordData = req.body
      console.log("keywordData", keywordData)
      // const storage = new Storage()
      const ref = `keywords/${auth.currentUser.uid}/${keywordData.host}/${keywordData.userId}`

      const keywordRef = doc(db, ref)
      // const result = { result: "success" }
      const result = await deleteDoc(keywordRef)

      res.send({
        status: "success",
        error: null,
        result: result
      })
    } catch (err) {
      console.log("There was an error")
      console.error(err)
      res.send({
        status: "error",
        error: err,
        result: null
      })
    }
  }
  res.send({ status: "error", error: "No signed in user found" })
}

export default handler
