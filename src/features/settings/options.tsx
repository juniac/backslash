// import { createRedirectUrl, useQueryString } from "@hooks/use-queryString";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, UserRoundPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

// import { z } from "zod"

import { PasswordInput } from "~components/auth/password-input"
import { Button, buttonVariants } from "~components/ui/button"
import { Card } from "~components/ui/card"
import { Checkbox } from "~components/ui/checkbox"
import { CommandShortcut } from "~components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import { Label } from "~components/ui/label"
import { Skeleton } from "~components/ui/skeleton"
import { Switch } from "~components/ui/switch"
import useSetting from "~firebase/useSetting"
import { cn } from "~lib/utils"
import { useSettingStore } from "~store/settings"

// const formSchema = z.object({
//   coupangSearchFocusHelperEnabled: z.boolean(),
//   soccerlineKeywordLoggerEnabled: z.boolean()
// })

// type SettingsFormType = z.infer<typeof formSchema>

export const Options = ({ user }) => {
  const navigate = useNavigate()
  const { isLoading, updateSetting, getSetting } = useSetting()
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [setting, setSetting] = useState({
    coupangSearchFocusHelperEnabled: true,
    soccerlineKeywordLoggerEnabled: true
  })

  useEffect(() => {
    const getFirebaseSetting = async () => {
      const result = await getSetting()
      console.log("result", result)
      if (result) {
        setSetting(result)
      } else {
        setSetting({
          coupangSearchFocusHelperEnabled: true,
          soccerlineKeywordLoggerEnabled: true
        })
      }
    }
    getFirebaseSetting()
  }, [])

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      coupangSearchFocusHelperEnabled: true,
      soccerlineKeywordLoggerEnabled: true
    },
    mode: "onChange",
    values: {
      coupangSearchFocusHelperEnabled: setting.coupangSearchFocusHelperEnabled,
      soccerlineKeywordLoggerEnabled: setting.soccerlineKeywordLoggerEnabled
    }
  })

  async function onSubmit(values: any) {
    setIsUpdating(true)
    const { coupangSearchFocusHelperEnabled, soccerlineKeywordLoggerEnabled } =
      values

    // e.preventDefault()
    await updateSetting(values)

    setIsUpdating(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[40px] w-[50px]" />
        <div className="space-y-4 mt-5">
          <Skeleton className="h-[70px] w-full" />
          <Skeleton className="h-[70px] w-full" />
        </div>
        <div className="text-right mt-5 w-full">
          <Skeleton className="h-[40px] w-[60px] inline-block" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mb-4 text-lg font-medium">설정</h1>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="coupangSearchFocusHelperEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>쿠팡 검색 포커스</FormLabel>
                      <FormDescription>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          <span className="text-xs">/</span>
                        </kbd>{" "}
                        키를 눌러 쿠팡 검색 포커스 헬퍼 기능을 사용합니다.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soccerlineKeywordLoggerEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>사커라인 키워드 로거</FormLabel>
                      <FormDescription>
                        soccerline 키워드 로거 기능을 사용합니다.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right mt-5">
              <Button disabled={!!isUpdating || !!isLoading} type="submit">
                {(isUpdating || isLoading) && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                저장
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
