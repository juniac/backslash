import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth/web-extension"
import { useStore } from "zustand"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { firebase_app } from "~background"

// import { auth } from "~firebase/firebaseClient"
// import { useUserStore } from "~store/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // const { useUserStore } = (selector) => useStore(userStore, selector)
  // const { setUser } = useUserStore()
  // const setUser = useUserStore((state) => state.setUser)

  console.log("saveAuth from popup", req.body)
  const auth = getAuth(firebase_app)
  const result = { status: null, user: null, error: null }
  try {
    const { values } = req.body
    const { email, password } = values

    if (!email || !password) {
      return console.log("Please enter email and password")
    }
    // e.preventDefault()

    const signInResult = await signInWithEmailAndPassword(auth, email, password)
    console.log(
      "🚀 ~ consthandler:PlasmoMessaging.MessageHandler= ~ auth:",
      auth
    )

    console.log("signInResult", signInResult)
    result.status = "success"
    result.user = signInResult.user
    // setUser(signInResult.user)
  } catch (error: any) {
    console.log("signInError", error.message)
    result.error = error
    // setUser(null)
  } finally {
    console.log("signInSuccess")
  }
  res.send(result)
}

export default handler
