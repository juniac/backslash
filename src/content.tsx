import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Button } from "~components/ui/button"
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

const PlasmoOverlay = () => {
  const [keyword, setKeyword] = useState<string | null>(null)
  // console.log("PlasmoOverlay loaded")

  const onSelectKeyword = async () => {
    if (window.getSelection && window.getSelection().type === "Range") {
      const selectedText = window.getSelection().toString()
      const host = window.location.host
      console.log("string", selectedText)
      setKeyword(selectedText)
    }
  }

  const onClickAddButton = async () => {
    console.log("Add Memo Button clicked!!")

    if (keyword) {
      await sendToBackground({
        name: "saveKeyword",
        body: {
          host: host,
          keyword: selectedText,
          memo: "test memo"
        }
      })
    }

    // Add your logic here
  }
  return (
    <div className="z-50  fixed top-32 right-8 bg-white p-5 space-y-2">
      <div>
        <Button onClick={onSelectKeyword} type="button" size="sm">
          선택 메모
        </Button>
      </div>
      <div>
        <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
      </div>
      <div>
        <Button onClick={onClickAddButton} type="button" size="sm">
          저장
        </Button>
      </div>
    </div>
  )
}

export default PlasmoOverlay
