import { SignIn } from "@clerk/chrome-extension"

export const SignInPage = () => {
  return (
    <>
      <h3>Backslash Sign In</h3>
      <SignIn routing="virtual" />
    </>
  )
}
