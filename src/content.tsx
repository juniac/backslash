import { zodResolver } from "@hookform/resolvers/zod"
import cssText from "data-text:~style.css"
import { LoaderCircle, UserRoundPlus } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { sendToBackground } from "@plasmohq/messaging"

import { Badge } from "~components/ui/badge"
import { Button } from "~components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import { Label } from "~components/ui/label"
import { AddMemoButton } from "~features/add-memo-button"

// import { CountButton } from "~features/count-button"

export const config: PlasmoCSConfig = {
  // matches: ["<all_urls>"]
  matches: ["https://soccerline.kr/*"]
}

/**
 * Generates a style element with adjusted CSS to work correctly within a Shadow DOM.
 *
 * Tailwind CSS relies on `rem` units, which are based on the root font size (typically defined on the <html>
 * or <body> element). However, in a Shadow DOM (as used by Plasmo), there is no native root element, so the
 * rem values would reference the actual page's root font size—often leading to sizing inconsistencies.
 *
 * To address this, we:
 * 1. Replace the `:root` selector with `:host(plasmo-csui)` to properly scope the styles within the Shadow DOM.
 * 2. Convert all `rem` units to pixel values using a fixed base font size, ensuring consistent styling
 *    regardless of the host page's font size.
 */
export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16

  let updatedCssText = cssText.replaceAll(":root", ":host(csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize

    return `${pixelsValue}px`
  })

  const styleElement = document.createElement("style")

  styleElement.textContent = updatedCssText

  return styleElement
}

const formSchema = z.object({
  memo: z.string()
})

type MemoFormType = z.infer<typeof formSchema>

const PlasmoOverlay = () => {
  console.log("PlasmoOverlay content.tsx!!!!!")
  const [keyword, setKeyword] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const form = useForm<MemoFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: ""
    }
  })

  const onSelectKeyword = async () => {
    if (window.getSelection && window.getSelection().type === "Range") {
      const selectedText = window.getSelection().toString()

      console.log("string", selectedText)
      setKeyword(selectedText)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)
    const { memo } = values
    console.log("🚀 ~ onSubmit ~ memo:", memo)
    if (keyword && keyword.length > 0 && memo.length > 0) {
      await sendToBackground({
        name: "saveKeyword",
        body: {
          host: window.location.host,
          keyword: keyword.trim(),
          memo: memo.trim()
        }
      })
    }
    setIsSaving(false)
  }

  const deleteKeyword = async () => {
    if (keyword && keyword.length > 0) {
      await sendToBackground({
        name: "deleteKeyword",
        body: {
          host: window.location.host,
          keywordi
        }
      })
    }

    // Add your logic here
  }
  return (
    <div className="z-50  fixed top-32 right-8 bg-white p-5 space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Button onClick={onSelectKeyword} type="button" size="sm">
              선택 메모
            </Button>
          </div>
          {keyword ? (
            <div className="my-2">
              <Badge variant="secondary">{keyword}</Badge>
            </div>
          ) : null}

          <div>
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="col-span-2 h-8"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      placeholder="키워드 메모 "
                      disabled={!!isSaving}
                      {...field}
                      // onChange={onChangeMemo}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between w-full">
            <Button disabled={!!isSaving} type="submit" className="mt-2">
              {isSaving && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              저장
            </Button>

            <Button
              disabled={!!isSaving}
              type="button"
              variant="destructive"
              className="mt-2"
              onClick={deleteKeyword}>
              {isSaving && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              삭제
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PlasmoOverlay
