import { useState, useEffect } from 'react'
import { marketplaceApi } from '../apis/marketplaceApi'
import { MarketplaceProduct } from '@/constants/marketplace-data'

// Hook lấy tất cả marketplace products
export const useMarketplaceProducts = () => {
     const [data, setData] = useState<MarketplaceProduct[]>([])
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState<Error | null>(null)

     const fetchProducts = async () => {
          try {
               setIsLoading(true)
               const result = await marketplaceApi.getAll()
               setData(result)
               setError(null)
          } catch (err) {
               setError(err as Error)
          } finally {
               setIsLoading(false)
          }
     }

     useEffect(() => {
          fetchProducts()
     }, [])

     return { data, isLoading, error, refetch: fetchProducts }
}

// Hook lấy product detail
export const useProductDetail = (id: string) => {
     const [data, setData] = useState<MarketplaceProduct | null>(null)
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState<Error | null>(null)

     useEffect(() => {
          const fetchProduct = async () => {
               try {
                    setIsLoading(true)
                    const result = await marketplaceApi.getById(id)
                    setData(result)
                    setError(null)
               } catch (err) {
                    setError(err as Error)
               } finally {
                    setIsLoading(false)
               }
          }

          if (id) {
               fetchProduct()
          }
     }, [id])

     const refetch = async () => {
          try {
               setIsLoading(true)
               const result = await marketplaceApi.getById(id)
               setData(result)
               setError(null)
          } catch (err) {
               setError(err as Error)
          } finally {
               setIsLoading(false)
          }
     }

     return { data, isLoading, error, refetch }
}

// Hook search products
export const useSearchProducts = (query: string, filter?: string) => {
     const [data, setData] = useState<MarketplaceProduct[]>([])
     const [isLoading, setIsLoading] = useState(false)
     const [error, setError] = useState<Error | null>(null)

     useEffect(() => {
          const searchProducts = async () => {
               if (!query) {
                    setData([])
                    return
               }

               try {
                    setIsLoading(true)
                    const result = await marketplaceApi.search(query, filter)
                    setData(result)
                    setError(null)
               } catch (err) {
                    setError(err as Error)
               } finally {
                    setIsLoading(false)
               }
          }

          const debounceTimer = setTimeout(() => {
               searchProducts()
          }, 500) // Debounce 500ms

          return () => clearTimeout(debounceTimer)
     }, [query, filter])

     return { data, isLoading, error }
}
