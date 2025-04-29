import { doc, getDoc, setDoc } from "firebase/firestore"

// import { getUser } from "~firebase/user"

import { db } from "./firebaseClient"

export const saveKeywords = async ({ data }) => {
  // const user = await getUser()
  // console.log("user", user)
  // const result = setDoc(
  //   doc(db, "keywords", user.currentUser.uid),
  //   {
  //     ...data
  //   },
  //   { merge: true }
  // )
  // return result
}

export const fetchKeywords = async (host: string) => {
  // const docRef = doc(db, "keywords", auth.currentUser.uid)
  // const docSnap = await getDoc(docRef)
  // if (docSnap.exists()) {
  //   return docSnap.data()
  // } else {
  //   console.log("No such document!")
  // }
}
