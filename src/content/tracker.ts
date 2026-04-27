import _ from "lodash"

export function activateKeywordTrackerOnSoccerline(keywords2) {
  // console.log("activateKeywordTrackerOnSoccerline", keywords2)
  const pathname = window.location.pathname
  // console.log("pathname", pathname)

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

  // console.log("keywordData", userIds, keywordData)

  if (pathname.startsWith("/board")) {
    if (pathname === "/board") {
      const applyMemos = () => {
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
      }

      const container = document.querySelector("#boardListContainer")
      if (container) {
        applyMemos()
      } else {
        const observer = new MutationObserver(() => {
          if (document.querySelector("#boardListContainer")) {
            observer.disconnect()
            applyMemos()
          }
        })
        observer.observe(document.body, { childList: true, subtree: true })
      }
    } else {
      const writerUserIdElement = document.querySelector(
        "#container div.writerBox > ul > li:nth-child(1) > div > span"
      )

      if (writerUserIdElement && writerUserIdElement.textContent) {
        const writerUserId = writerUserIdElement.textContent
          .trim()
          .replace(/[()]/g, "")
        if (_.has(keywordData, writerUserId)) {
          showKeywordMemo(
            writerUserIdElement as HTMLElement,
            keywordData[writerUserId] as string
          )
        }
      }

      const applyCommentMemos = () => {
        const commentWriters = document.querySelectorAll(
          "#board-view-comment-list span.btnUser"
        )
        commentWriters.forEach((commentWriter) => {
          const commentWriterElement = commentWriter as HTMLElement
          const match = commentWriter.textContent
            .trim()
            .match(/^(.+?)\(([^,]+),.*?\)$/)
          if (!match) return
          const writerUserId = match[2]
          if (_.has(keywordData, writerUserId)) {
            showKeywordMemo(
              commentWriterElement,
              keywordData[writerUserId] as string
            )
          }
        })
      }

      const commentList = document.querySelector("#board-view-comment-list")
      if (commentList) {
        applyCommentMemos()
      } else {
        const observer = new MutationObserver(() => {
          if (document.querySelector("#board-view-comment-list")) {
            observer.disconnect()
            applyCommentMemos()
          }
        })
        observer.observe(document.body, { childList: true, subtree: true })
      }
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
  // console.log("description", description)
  memo.style.fontSize = "0.7em"
  memo.style.fontWeight = "light"
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
