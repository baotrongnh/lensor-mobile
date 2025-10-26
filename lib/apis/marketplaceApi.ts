import { apiClient } from './client'
import { endpoints } from './endpoints'

export const marketplaceApi = {
     // Lấy tất cả products
     getAll: async () => {
          const res = await apiClient.get(endpoints.marketplace.all)
          return res.data
     },

     // Lấy product theo ID
     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.marketplace.byId(id))
          return res.data
     },

     // Search products
     search: async (query: string, filter?: string) => {
          const res = await apiClient.get(endpoints.marketplace.all, {
               params: { q: query, filter },
          })
          return res.data
     },
}
