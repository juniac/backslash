// 기본 사용 예시
// import _ from "lodash"
import { create } from "zustand"

// import { persist } from "zustand/middleware"

interface UserStore {
  user: any
  setUser: (user) => void
}
const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))

export { useUserStore }
// export const getUserStore = () => useStore((state) => state.user)
// export const setUserStore = (user) => useStore.getState().setUser(user)

/*

// 크롬 스토리지를 위한 커스텀 스토리지
const chromeStorage = {
  getItem: async (name: string) => {
    const result = await chrome.storage.local.get(name)
    return result[name] || null
  },
  setItem: async (name: string, value) => {
    await chrome.storage.local.set({ [name]: value })
  },
  removeItem: async (name: string) => {
    await chrome.storage.local.remove(name)
  }
}

const useStore = create(
  persist<User>(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        // console.log("유저 상태 변경:", user)
        set({ user })
      }
    }),
    {
      name: "user-storage",
      storage: chromeStorage,
      // 스토리지 동기화 문제를 방지하기 위한 옵션들
      skipHydration: true,
      version: 1,
      onRehydrateStorage: (state) => {
        // console.log("hydration starts")
        return (state, error) => {
          console.log("hydration error", error)
        }
      }
    }
  )
)

export const getUserStore = () => useStore((state) => state.user)
export const setUserStore = (user) => useStore.getState().setUser(user)

// 초기 hydration을 수동으로 트리거
chrome.storage.local.get("user-storage").then((result) => {
  // console.log("hydrate result", result)
  if (_.has(result, "user-storage")) {
    try {
      const state = JSON.parse(result["user-storage"])
      // console.log("hydrate state", state)
      useStore.setState(state)
    } catch (e) {
      // console.error("Failed to hydrate state:", e)
    }
  }
})

*/
