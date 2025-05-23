import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router"

import { AuthHeader } from "./auth-header"

export const RootLayout = () => {
  const [updated, setUpdated] = useState(0)
  const location = useLocation()
  useEffect(() => {
    setUpdated((state) => state + 1)
    //route change detected. do something here
  }, [location])
  return (
    <div className="w-full max-h-full">
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="font-bold text-xl">backslash</h1>
            </Link>
          </div>
          <AuthHeader updated={updated} />
        </div>
      </header>
      <div className="w-full max-h-full">
        <div className="p-4 rounded-xl bg-white text-black">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
