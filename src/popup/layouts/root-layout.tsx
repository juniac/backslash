import { Link, Outlet } from "react-router"

import { Button, buttonVariants } from "~components/ui/button"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { cn } from "~lib/utils"

export const RootLayout = () => {
  // const navigate = useNavigate()
  const { isLoading, user, onLogout } = useFirebaseUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-h-full">
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="font-bold text-xl">backslash</h1>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end">
            {user ? (
              <Button
                onClick={onLogout}
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
        </div>
      </header>
      <div className="w-full  max-h-full">
        <div className="p-4 rounded-xl bg-white text-black">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
