import { useEffect, useState } from "react"

import { Options } from "~features/settings/options"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { useUserStore } from "~store/user"

export const Home = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const { isLoading } = useFirebaseUser()
  const { user } = useUserStore()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <div>Not signed in. please sign in first.</div>
  }

  return <>{user && <Options user={user} />}</>
}
