import axios from 'axios'
import { useAppStore } from '../../store'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    useAppStore.getState().setLoading(true)
    return config
  },
  (error) => {
    useAppStore.getState().setLoading(false)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    useAppStore.getState().setLoading(false)
    return response
  },
  (error) => {
    useAppStore.getState().setLoading(false)

    if (error.response?.status === 401) {
      // Manejar error de autenticación
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
