import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/chrome-extension"
import { koKR } from "@clerk/localizations"

import { Button } from "~components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "~components/ui/navigation-menu"
import { cn } from "~lib/utils"

// import { AddMemoButton } from "~features/add-memo-button"
// import { CountButton } from "~features/count-button"

import "~style.css"

// import "~styles/global.css"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const EXTENSION_URL = chrome.runtime.getURL(".")

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
  )
}

function IndexPopup() {
  return (
    <div>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
        signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
        signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
        localization={koKR}>
        <div className="h-[1200px] w-[800px]">
          <header className="w-full bg-slate-400 p-5 flex items-center justify-center  flex-col">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <SignedOut>
              <Button asChild type="button">
                <SignInButton mode="modal" />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main className="grow">
            <div>main popup content area</div>
          </main>
        </div>
      </ClerkProvider>
    </div>
  )
}

export default IndexPopup
