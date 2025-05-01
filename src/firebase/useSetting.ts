import { doc, setDoc } from "firebase/firestore"
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

    console.log("user", user)
    const result = { result: "success" }
    // const result = await setDoc(doc(db, "settings", uid), values)
    setIsLoading(false)
    return result
  }

  return {
    isLoading,
    coupangSearchFocusHelperEnabled,
    soccerlineKeywordLoggerEnabled,
    getSetting,
    updateSetting
  }
}
