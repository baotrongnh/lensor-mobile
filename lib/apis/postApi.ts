import { apiClient } from './client'
import { endpoints } from './endpoints'

export const postApi = {
     // Lấy tất cả posts
     getAll: async () => {
          const res = await apiClient.get(endpoints.post.all)
          return res.data
     },

     // Lấy post theo ID
     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.post.byId(id))
          return res.data
     }
}
