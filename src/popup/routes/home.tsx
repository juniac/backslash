import { useEffect, useState } from "react"

import { Options } from "~features/settings/options"
import useFirebaseUser from "~firebase/useFirebaseUser"

export const Home = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const { user, isLoading } = useFirebaseUser()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <div>Not signed in. please sign in first.</div>
  }

  return <>{user && <Options user={user} />}</>
}
