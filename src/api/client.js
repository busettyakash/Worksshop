// API client — uses relative /api in production (Vercel proxies to backend)
// and localhost:5000 in local development
import axios from 'axios'

const isProd = import.meta.env.PROD  // true on Vercel, false on local dev

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isProd ? '/api' : 'http://localhost:5000/api'),
  timeout: 15000,
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ws_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — clear storage and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ws_token')
      localStorage.removeItem('ws_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
