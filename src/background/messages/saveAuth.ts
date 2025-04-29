import { signInWithEmailAndPassword } from "firebase/auth"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { auth } from "~firebase/firebaseClient"
import { setUserStore } from "~store/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("saveAuth from popup", req.body)
  const result = { status: null, user: null, error: null }
  try {
    const { values } = req.body
    const { email, password } = values

    if (!email || !password) {
      return console.log("Please enter email and password")
    }
    // e.preventDefault()

    const signInResult = await signInWithEmailAndPassword(auth, email, password)

    console.log("signInResult", signInResult)
    result.status = "success"
    result.user = signInResult.user
    setUserStore(signInResult.user)
  } catch (error: any) {
    console.log("signInError", error.message)
    result.error = error
    setUserStore(null)
  } finally {
    console.log("signInSuccess")
  }
  res.send(result)
}

export default handler
