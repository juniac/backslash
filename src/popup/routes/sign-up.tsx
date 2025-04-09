import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router"

import { auth } from "~firebase/firebaseClient"
import useFirebaseUser from "~firebase/useFirebaseUser"

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const { isLoading, onLogin } = useFirebaseUser()

  const signUp = async (e: any) => {
    try {
      if (!email || !password || !confirmPassword)
        return console.log("Please enter email and password")

      if (password !== confirmPassword)
        return console.log("Passwords do not match")

      e.preventDefault()

      const user = await createUserWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <>
      <h3> Sign up</h3>
      <form className="space-y-4 md:space-y-6" onSubmit={signUp}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-light text-gray-500">
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline"
                href="#">
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-black bg-gray-300 hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="bg-transparent font-medium text-primary-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </>
  )
}
