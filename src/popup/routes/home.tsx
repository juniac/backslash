import { Options } from "~features/settings/options"
import useFirebaseUser from "~firebase/useFirebaseUser"

export const Home = () => {
  const { isLoading, user } = useFirebaseUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{user && <Options user={user} />}</>
}
