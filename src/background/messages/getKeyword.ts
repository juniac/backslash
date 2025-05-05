import { getAuth } from "firebase/auth/web-extension"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc
} from "firebase/firestore"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { db, firebase_app } from "~background"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("content.ts getKeyword", req.body)
  const auth = getAuth(firebase_app)
  // console.log("🚀 ~ auth.currentUser:", auth.currentUser)
  if (auth && auth.currentUser) {
    try {
      const ref = `keywords/${auth.currentUser.uid}/${req.body.host}`
      console.log("ref", ref)
      const keywordRef = collection(db, ref)
      // const result = { result: "success" }
      const snapshots = await getDocs(keywordRef)
      const data = []
      snapshots.forEach((doc) => {
        data.push(doc.data())
      })
      res.send({
        status: "success",
        error: null,
        data: data
      })
    } catch (err) {
      console.log("There was an error")
      console.error(err)
      res.send({
        status: "error",
        error: err,
        data: null
      })
    }
  }
  res.send({ status: "error", error: "No signed in user found", data: null })
}

export default handler
