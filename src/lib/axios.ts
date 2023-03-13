import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

/* api.interceptors.request.use((value) => {
  return new Promise((resolve, reject) => {
    value.headers['Content-Type'] = 'application/json'
  })
}) */
