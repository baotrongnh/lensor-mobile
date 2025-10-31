import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { marketplaceApi } from "../apis/marketplaceApi"

export const useMarketplace = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(
          endpoints.marketplace.all,
          marketplaceApi.getAll
     )
     return { data, error, isLoading, mutate, isValidating }
}

export const useMarketplaceDetail = (id: string) => {
     const { data: dataRaw, error, isLoading, mutate } = useSWR(
          endpoints.product.byId(id),
          () => marketplaceApi.getById(id)
     )

     console.log('🎯 useMarketplaceDetail - ID:', id)
     console.log('🎯 useMarketplaceDetail - dataRaw:', dataRaw)
     console.log('🎯 useMarketplaceDetail - error:', error)
     console.log('🎯 useMarketplaceDetail - isLoading:', isLoading)

     const data = dataRaw?.data
     console.log('🎯 useMarketplaceDetail - final data:', data)

     return { data, error, isLoading, mutate }
}
