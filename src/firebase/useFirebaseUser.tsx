import {
  getAuth,
  // browserLocalPersistence,
  onAuthStateChanged,
  setPersistence
  // type User
} from "firebase/auth/web-extension"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { firebase_app } from "~background"
import { useUserStore } from "~store/user"

// import { auth } from "./firebaseClient"
// setPersistence(auth, browserLocalPersistence)

export default function useFirebaseUser() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useUserStore()

  const auth = getAuth(firebase_app)
  // const user = getUserStore()

  const getUser = async () => {
    setIsLoading(true)
    const result = await sendToBackground({
      name: "getAuth",
      body: {}
    })
    setIsLoading(false)
    if (result.user) {
      setUser(result.user)
    } else {
      setUser(null)
    }
    return result
  }

  const logoutAction = async () => {
    console.log("logoutAction")
    setIsLoading(true)
    if (user) {
      await auth.signOut()

      await sendToBackground({
        name: "removeAuth",
        body: {}
      })
    }
    setIsLoading(false)
    setUser(null)
  }

  const loginAction = async (values) => {
    console.log("loginAction", values)
    setIsLoading(true)
    const result = await sendToBackground({
      name: "saveAuth",
      body: {
        values
      }
    })
    if (result.status === "success" || result.user) {
      // console.log("loginAction result", result)
      // setUser(result.user)
      setIsLoading(false)
      setUser(result.user)
      return result.user
    } else {
      setUser(null)
    }
    setIsLoading(false)
    return null

    // Get current user auth token
    // user.getIdToken(true).then(async (token) => {
    //   // Send token to background to save
    //   await sendToBackground({
    //     name: "saveAuth",
    //     body: {
    //       values,
    //       token,
    //       uid,
    //       refreshToken: user.refreshToken
    //     }
    //   })
    // })
  }

  // useEffect(() => {
  //   // 초기 사용자 상태 가져오기

  //   chrome.runtime.sendMessage({ type: "GET_CURRENT_USER" }, (response) => {
  //     setUser(response.user)
  //     setIsLoading(false)
  //   })

  //   // 인증 상태 변경 리스너
  //   const listener = (message) => {
  //     if (message.type === "AUTH_STATE_CHANGED") {
  //       setUser(message.user)
  //     }
  //   }

  //   chrome.runtime.onMessage.addListener(listener)
  //   return () => chrome.runtime.onMessage.removeListener(listener)
  // }, [])

  useEffect(() => {
    getUser()
    // onAuthStateChanged(auth, (user) => {
    //   setIsLoading(false)
    //   setUser(user)
    // })
  }, [])

  // useEffect(() => {
  //   if (user) {
  //     loginAction()
  //   }
  // }, [user])

  return {
    isLoading,
    user,
    getUser,
    loginAction,
    logoutAction
  }
}
