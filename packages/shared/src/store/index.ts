import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { z } from 'zod'
import { StateCreator } from 'zustand'

// Schema de validación
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

type User = z.infer<typeof UserSchema>

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

interface AppState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const authStore: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) => {
    const validatedUser = UserSchema.parse(user)
    set({ user: validatedUser, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
})

export const useStore = create<AuthState & AppState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...authStore(set, get, api),
        isLoading: false,
        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'app-storage',
      }
    )
  )
)
