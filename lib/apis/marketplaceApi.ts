import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const marketplaceApi = {
     getAll: async () => {
          const res = await apiClient.get(endpoints.marketplace.all)
          return res.data
     },

     getById: async (id: string) => {
          console.log('🔍 Fetching product detail with ID:', id)
          console.log('📍 Endpoint:', endpoints.product.byId(id))
          const res = await apiClient.get(endpoints.product.byId(id))
          console.log('📦 Product detail response:', res.data)
          return res.data
     }
}
