import _ from "lodash"

export function activateKeywordTrackerOnSoccerline(keywords2) {
  console.log("activateKeywordTrackerOnSoccerline", keywords2)
  const pathname = window.location.pathname
  console.log("pathname", pathname)

  const userIds = keywords2.map((k) => k.userId)
  const userNicknames = keywords2.map((k) => k.nickname)
  const keywordData = keywords2.reduce((acc, k) => {
    acc[k.userId] = k.memo
    return acc
  }, {})
  const nicknameData = keywords2.reduce((acc, k) => {
    acc[k.nickname] = k.memo
    return acc
  }, {})

  console.log("keywordData", userIds, keywordData)

  if (pathname.startsWith("/board")) {
    // const contentListRegex = /\/board;
    // const contentViewRegex = /\/board\/contentView/;

    if (pathname.endsWith("/board")) {
      console.log("content list")
      const nicknames = document.querySelectorAll(
        "#boardListContainer table tr td:nth-child(3)"
      )
      nicknames.forEach((nickname) => {
        const nicknameElement = nickname as HTMLElement

        if (nicknameElement && nicknameElement.textContent) {
          if (_.has(nicknameData, nicknameElement.textContent)) {
            showKeywordMemo(
              nicknameElement,
              nicknameData[nicknameElement.textContent as string] as string
            )
          }
        }
      })
    } else {
      console.log("content view")
      const writerUserIdElement = document.querySelector(
        "#container div.writerBox > ul > li:nth-child(1) > div > span"
      )

      if (writerUserIdElement && writerUserIdElement.textContent) {
        const writerUserId = writerUserIdElement.textContent
          .trim()
          .replace(/[()]/g, "")
        // userIds.includes(writerUserId.textContent.trim())
        // console.log("writerUserId", writerUserId)
        if (_.has(keywordData, writerUserId)) {
          showKeywordMemo(
            writerUserIdElement as HTMLElement,
            keywordData[writerUserId] as string
          )
        }
      }
      const commentWriters = document.querySelectorAll(
        "#board-view-comment-list h2.userId a.btnUser"
      )
      commentWriters.forEach((commentWriter) => {
        const commentWriterElement = commentWriter as HTMLElement
        // console.log("commentwriter", commentWriter.textContent)
        const [, writerNickname, writerUserId] = commentWriter.textContent
          .trim()
          .match(/^(.+?)\(([^,]+),.*?\)$/)
        // console.log("writerNickname", writerNickname)
        // console.log("writerUserId", writerUserId)
        if (_.has(keywordData, writerUserId)) {
          console.log(
            "writerUserId",
            writerUserId,
            keywordData[writerUserId] as string
          )
          showKeywordMemo(
            commentWriterElement,
            keywordData[writerUserId] as string
          )
        }
      })
    }
  }
}

export function showKeywordMemo(element: HTMLElement, description: string) {
  const nickname = element.textContent
  element.innerHTML = ""
  const nicknameWrapper = document.createElement("div")
  const nicknameBody = document.createElement("span")
  const memo = document.createElement("span")
  nicknameWrapper.style.width = "100%"
  // memo.style.top = '100%';
  // memo.style.left = '100%';
  console.log("description", description)
  memo.style.fontSize = "0.7em"
  memo.style.backgroundColor = "#fff094"
  memo.style.padding = "2px"
  memo.style.marginLeft = "3px" // memo.style.height = '10px';
  nicknameBody.innerHTML = `${nickname}`
  memo.innerHTML = `${description}`
  // nicknameWrapper.style.display = "inline"
  nicknameWrapper.appendChild(nicknameBody)
  nicknameWrapper.appendChild(memo)

  element.appendChild(nicknameWrapper)
}
