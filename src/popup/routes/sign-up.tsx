import { SignUp } from "@clerk/chrome-extension"

export const SignUpPage = () => {
  return (
    <>
      <h3>Backslash Sign Up</h3>
      <SignUp routing="virtual" />
    </>
  )
}
