import { UserProfile } from "@clerk/chrome-extension"

export const Settings = () => {
  return (
    <>
      <h3>Backslash Settings</h3>
      <UserProfile routing="virtual" />
    </>
  )
}
