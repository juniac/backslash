export const Options = ({ user }) => {
  return (
    <div>
      <h2>Settings Options</h2>
      {user && <p>Welcome, {user.displayName}!</p>}
    </div>
  )
}
