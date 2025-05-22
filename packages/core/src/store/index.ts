import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'app-storage',
    }
  )
)
