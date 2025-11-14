import type { UserProfile } from "./types"

const STORAGE_KEYS = {
  PROFILE: "graduation_profile",
}

export const storage = {
  getProfile: (): UserProfile | null => {
    if (typeof window === "undefined") return null
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE)
    return data ? JSON.parse(data) : null
  },

  saveProfile: (profile: UserProfile) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
  },

  clearAll: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.PROFILE)
  },
}
