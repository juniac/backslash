import { useEffect } from "react"
import { Link, Outlet } from "react-router"

import { Button, buttonVariants } from "~components/ui/button"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { cn } from "~lib/utils"

export const AuthHeader = () => {
  // const navigate = useNavigate()
  const { isLoading, user, logoutAction, getUser } = useFirebaseUser()

  console.log("header-> authuser", user)

  useEffect(() => {
    getUser()
    // onAuthStateChanged(auth, (user) => {
    //   setIsLoading(false)
    //   setUser(user)
    // })
  }, [])

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
