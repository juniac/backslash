import React from "react"

// import "../style.css"

import { cn } from "~lib/utils"

// import { AddMemoButton } from "~features/add-memo-button"
// import { CountButton } from "~features/count-button"

import "~style.css"

import { createMemoryRouter, RouterProvider } from "react-router"

import { RootLayout } from "./layouts/root-layout"
import { Home } from "./routes/home"
import { Settings } from "./routes/settings"
import { SignIn } from "./routes/sign-in"
import { SignUp } from "./routes/sign-up"

const router = createMemoryRouter([
  {
    // Wraps the entire app in the root layout
    element: <RootLayout />,
    // Mounted where the <Outlet /> component is inside the root layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/settings", element: <Settings /> }
    ]
  }
])

export default function PopupIndex() {
  return <RouterProvider router={router} />
}
