import { doc, getDoc, setDoc } from "firebase/firestore"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { db } from "~background"
import { useSettingStore } from "~store/settings"
import { useUserStore } from "~store/user"

// setPersistence(auth, browserLocalPersistence)

export default function useSettings() {
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const {
    coupangSearchFocusHelperEnabled,
    soccerlineKeywordLoggerEnabled,
    setCoupangSearchFocusHelperEnabled,
    setSoccerlineKeywordLoggerEnabled
  } = useSettingStore()

  const getSetting = async () => {
    setIsLoading(true)
    if (user && user.uid) {
      // const result = { result: "success" }
      const docSnapshot = await getDoc(doc(db, "settings", user.uid))
      if (docSnapshot.exists()) {
        setIsLoading(false)
        const result = docSnapshot.data()
        return result
      }
    }
    setIsLoading(false)
    return null
    // const result = await sendToBackground({
    //   name: "getAuth",
    //   body: {}
    // })
    // setIsLoading(false)
    // if (result.user) {
    //   setUser(result.user)
    // } else {
    //   setUser(null)
    // }
    // return result
  }

  const updateSetting = async (values) => {
    setIsLoading(true)
    // const result = await sendToBackground({
    //   name: "saveAuth",
    //   body: {
    //     values
    //   }
    // })

    // console.log("values", values)
    // console.log("user", user)
    if (user && user.uid) {
      // const result = { result: "success" }
      const result = await setDoc(doc(db, "settings", user.uid), values)
      setIsLoading(false)
    }
    return null
  }

  return {
    isLoading,
    coupangSearchFocusHelperEnabled,
    soccerlineKeywordLoggerEnabled,
    getSetting,
    updateSetting
  }
}
