import _ from "lodash"

export function activateKeywordTrackerOnSoccerline(keywords2) {
  console.log("activateKeywordTrackerOnSoccerline", keywords2)
  const pathname = window.location.pathname
  console.log("pathname", pathname)

  const keywords = keywords2.map((k) => k.keyword)
  const keywordData = keywords2.reduce((acc, k) => {
    acc[k.keyword] = k.memo
    return acc
  }, {})

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

        if (
          nicknameElement.textContent &&
          keywords.includes(nicknameElement.textContent.trim())
        ) {
          if (_.has(keywordData, nicknameElement.textContent)) {
            showKeywordMemo(
              nicknameElement,
              keywordData[nicknameElement.textContent as string] as string
            )
          }
        }
      })
    } else {
      console.log("content view")
      const writerNickname = document.querySelector(
        "#container div.writerBox > ul > li:nth-child(1) > div > a > span"
      )
      if (
        writerNickname.textContent &&
        keywords.includes(writerNickname.textContent.trim())
      ) {
        if (_.has(keywordData, writerNickname.textContent)) {
          showKeywordMemo(
            writerNickname,
            keywordData[writerNickname.textContent as string] as string
          )
        }
      }
      const nicknames = document.querySelectorAll(
        "#board-view-comment-list h2.userId a.btnUser"
      )
      nicknames.forEach((nickname) => {
        const nicknameElement = nickname as HTMLElement
        const fullname = nicknameElement.textContent
        const realname = fullname?.split("(")[0]
        console.log("realname", realname)
        if (realname && keywords.includes(realname.trim())) {
          if (_.has(keywordData, realname.trim())) {
            showKeywordMemo(
              nicknameElement,
              keywordData[realname as string] as string
            )
          }
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
