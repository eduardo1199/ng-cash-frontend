import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL,
})

api.defaults.withCredentials = true

/* api.interceptors.request.use((value) => {
  return new Promise((resolve, reject) => {
    value.headers['Content-Type'] = 'application/json'
  })
}) */
