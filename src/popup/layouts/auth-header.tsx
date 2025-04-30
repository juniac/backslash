import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router"

import { Button, buttonVariants } from "~components/ui/button"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { cn } from "~lib/utils"
import { useUserStore } from "~store/user"

export const AuthHeader = ({ updated }) => {
  // const navigate = useNavigate()
  // const [user, setUser] = useState(null)
  const { isLoading, logoutAction } = useFirebaseUser()
  const { user } = useUserStore()

  // console.log("🚀 ~ AuthHeader ~ user:", user)

  useEffect(() => {
    // console.log("🚀 ~ AuthHeader ~ isLoading:", isLoading)
    // if (isLoading === false) {
    // const { userBstoredUser = useUserStore()
    // setUser(storedUser)
    // console.log("🚀 ~ AuthHeader ~ storedUser:", storedUser)
    // }
  }, [updated])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-1 items-center justify-end">
      {user ? (
        <Button
          onClick={logoutAction}
          variant="outline"
          className="right-4 top-4 md:right-8 md:top-8">
          로그아웃
        </Button>
      ) : (
        <Link
          to="/sign-in"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "right-4 top-4 md:right-8 md:top-8"
          )}>
          로그인
        </Link>
      )}
    </div>
  )
}
