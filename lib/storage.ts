import type { UserProfile, GraduationRequirements } from "./types"

const STORAGE_KEYS = {
  PROFILE: "graduation_profile",
  REQUIREMENTS: "graduation_requirements",
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

  getRequirements: (): GraduationRequirements | null => {
    if (typeof window === "undefined") return null
    const data = localStorage.getItem(STORAGE_KEYS.REQUIREMENTS)
    return data ? JSON.parse(data) : null
  },

  saveRequirements: (requirements: GraduationRequirements) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.REQUIREMENTS, JSON.stringify(requirements))
  },

  clearAll: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.PROFILE)
    localStorage.removeItem(STORAGE_KEYS.REQUIREMENTS)
  },
}
