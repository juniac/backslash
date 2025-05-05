import { doc, getDoc, setDoc } from "firebase/firestore"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { db } from "~background"
import { useUserStore } from "~store/user"

// setPersistence(auth, browserLocalPersistence)

export default function useKeyword() {
  const { user } = useUserStore()
  const [isSaving, setIsSaving] = useState(false)

  const getKeywords = async () => {
    setIsSaving(true)
    if (user && user.uid) {
      // const result = { result: "success" }

      const ref = `keywords/${user.uid}/`
      const keywordRef = doc(db, ref)
      const docSnapshot = await getDoc(doc(db, "keywords", user.uid))
      if (docSnapshot.exists()) {
        setIsSaving(false)
        const result = docSnapshot.data()
        return result
      }
    }
    setIsSaving(false)
    return null
  }

  const saveKeyword = async (values) => {
    setIsSaving(true)

    if (user && user.uid) {
      const ref = `keywords/${user.uid}/${values.host}`
      const keywordRef = doc(db, ref)
      // const result = { result: "success" }
      const result = await setDoc(keywordRef, values)
      setIsSaving(false)
    }
    return null
  }

  return {
    isSaving,
    saveKeyword,
    getKeywords
  }
}
