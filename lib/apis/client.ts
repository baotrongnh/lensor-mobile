import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const TOKEN_TEST = process.env.EXPO_PUBLIC_TEST_TOKEN || 'test123'

// Đổi base URL này theo backend của bạn
export const apiClient = axios.create({
     baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
     timeout: 10000,
     headers: {
          'Content-Type': 'application/json',
     },
})

// Request interceptor - thêm token vào mỗi request
apiClient.interceptors.request.use(
     (config: InternalAxiosRequestConfig) => {
          config.headers.Authorization = `Bearer ${TOKEN_TEST}`
          return config
     },
     (error: AxiosError) => {
          return Promise.reject(error)
     }
)

// Response interceptor - xử lý lỗi 401
apiClient.interceptors.response.use(
     (response) => response,
     async (error: AxiosError) => {
          if (error.response?.status === 401) {
               // Có thể thêm logic refresh token ở đây
               return apiClient(error.config!)
          }
          throw error
     }
)
