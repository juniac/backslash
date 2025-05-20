export function activateSlashKeyOnCoupang() {
  console.log("coupang slash ")
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "/") {
      // document.getElementById("headerSearchKeyword")?.focus()
      const searchInput = document.querySelector(
        "form#wa-search-form input[name='q']"
      ) as HTMLInputElement
      searchInput?.focus()
      e.preventDefault()
    }
  })
}
