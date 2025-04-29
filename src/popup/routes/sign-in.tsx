// import { createRedirectUrl, useQueryString } from "@hooks/use-queryString";
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { LoaderCircle, UserRoundPlus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { z } from "zod"

import { PasswordInput } from "~components/auth/password-input"
import { Button, buttonVariants } from "~components/ui/button"
import { Card } from "~components/ui/card"
import { Checkbox } from "~components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import { Label } from "~components/ui/label"
import { auth } from "~firebase/firebaseClient"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { cn } from "~lib/utils"
import { AuthLayout } from "~popup/layouts/auth-layout"

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일 입력은 필수입니다." })
    .email({ message: "잘못된 이메일 주소" }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상입니다." })
})

type signUpFormType = z.infer<typeof formSchema>

export const SignIn = () => {
  const navigate = useNavigate()
  const { isLoading, loginAction } = useFirebaseUser()
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)

  const form = useForm<signUpFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "juniac@naver.com",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSigningIn(true)
    const { email, password } = values

    if (!email || !password) {
      return console.log("Please enter email and password")
    }
    // e.preventDefault()

    const result = await loginAction(values)
    console.log("background message login result", result)
    if (result) {
      setIsSigningIn(false)
      navigate("/")
    }

    // try {
    //   const signInResult = await signInWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   )

    //   setIsSigningIn(false)
    //   console.log("signInResult", signInResult)
    // } catch (error: any) {
    //   console.log("signInError", error.message)
    // } finally {
    //   loginAction(values)
    //   navigate("/")
    // }
    // setIsSigningIn(LoginProvider.EMAIL)
    // const result = await signIn(values)
    // if (result.success === false && result.error) {
    //   printError(result.error)
    //   setIsSigningIn(null)
    // } else if (result.success == true) {
    //   const redirectUrl = createRedirectUrl(
    //     "/dashboard",
    //     "continue",
    //     queryParams
    //   )
    //   redirect(redirectUrl)
    // }
  }

  return (
    <AuthLayout>
      <>
        <Link
          to="/sign-up"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}>
          <UserRoundPlus />
          회원가입
        </Link>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
        </div>
        <div className={cn("grid gap-6")}>
          {/* <form onSubmit={onSubmit}> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={!!isSigningIn}
                            required
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="*********"
                            autoComplete="none"
                            disabled={!!isSigningIn}
                            required
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={!!isSigningIn || !!isLoading}
                  type="submit"
                  className="mt-2">
                  {(isSigningIn || isLoading) && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  로그인
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <p className="px-1 text-right text-xs text-muted-foreground break-keep">
          <Link
            to="/lost-password"
            className="underline underline-offset-4 hover:text-primary">
            비밀번호 찾기
          </Link>{" "}
        </p>
      </>
    </AuthLayout>
  )
}
