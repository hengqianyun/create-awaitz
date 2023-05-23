import axios from 'axios'
import nProgress from 'nprogress'
import { useUserStore } from '@/store/user'

const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
})

HttpClient.interceptors.request.use(
  (config) => {
    const token = useUserStore().token

    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
HttpClient.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    useUserStore().clearToken()
    // token过期操作
  }
  return res
})

export interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  async get(url, params?) {
    nProgress.start()
    try {
      const res = await HttpClient.get(url, { params }).catch((err) => {
        nProgress.done()
        throw err.data
      })
      nProgress.done()
      return res.data
    } catch (err) {
      nProgress.done()
      throw err
    }
  },
  async post(url, params?) {
    nProgress.start()
    try {
      const res = await HttpClient.post(url, JSON.stringify(params)).catch(
        (err) => {
          nProgress.done()
          throw err.data
        }
      )
      nProgress.done()
      return res.data
    } catch (err) {
      nProgress.done()
      throw err
    }
  },
  async upload(url, file) {
    nProgress.start()
    try {
      const res = await HttpClient.post(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).catch((err) => {
        nProgress.done()
        throw err.data
      })
      nProgress.done()
      return res.data
    } catch (err) {
      nProgress.done()
      throw err
    }
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}

export default http
