// 기본 사용 예시
// import _ from "lodash"
import { create } from "zustand"

// import { persist } from "zustand/middleware"

interface SettingStore {
  coupangSearchFocusHelperEnabled: boolean
  soccerlineKeywordLoggerEnabled: boolean
  setCoupangSearchFocusHelperEnabled: (
    coupangSearchFocusHelperEnabled: boolean
  ) => void
  setSoccerlineKeywordLoggerEnabled: (
    soccerlineKeywordLoggerEnabled: boolean
  ) => void
}
const useSettingStore = create<SettingStore>((set) => ({
  coupangSearchFocusHelperEnabled: true,
  soccerlineKeywordLoggerEnabled: true,
  setCoupangSearchFocusHelperEnabled: (enabled) =>
    set({ coupangSearchFocusHelperEnabled: enabled }),
  setSoccerlineKeywordLoggerEnabled: (enabled) =>
    set({ soccerlineKeywordLoggerEnabled: enabled })
}))

export { useSettingStore }
