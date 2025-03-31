import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/chrome-extension"
import { koKR } from "@clerk/localizations"
import { Link, Outlet, useNavigate } from "react-router"

import { Button } from "~components/ui/button"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
  )
}

export const RootLayout = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      // routerPush={(to) => navigate(to)}
      // routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      // afterSignOutUrl="/"
      localization={koKR}>
      <div className="w-[800px] h-[1200px]">
        <main className="p-5 flex items-center justify-center  flex-col">
          <Outlet />
        </main>
        <footer>
          <SignedIn>
            <div className="flex items-center justify-center gap-2">
              <Button asChild type="button">
                <Link to="/settings">Settings</Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center justify-center gap-2">
              <Button asChild type="button">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild type="button">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild type="button">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </footer>
      </div>
    </ClerkProvider>
  )
}
