import { useState, useEffect } from 'react'
import { postApi } from '../apis/postApi'

export interface Post {
     id: string
     user: {
          username: string
          avatar: string
     }
     image: string
     caption: string
     likes: number
     isLiked: boolean
     comments: number
     timeAgo: string
}

// Hook lấy tất cả posts
export const usePosts = () => {
     const [data, setData] = useState<Post[]>([])
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState<Error | null>(null)

     const fetchPosts = async () => {
          try {
               setIsLoading(true)
               const result = await postApi.getAll()
               setData(result)
               setError(null)
          } catch (err) {
               setError(err as Error)
          } finally {
               setIsLoading(false)
          }
     }

     useEffect(() => {
          fetchPosts()
     }, [])

     return { data, isLoading, error, refetch: fetchPosts }
}

// Hook lấy post detail
export const usePostDetail = (id: string) => {
     const [data, setData] = useState<Post | null>(null)
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState<Error | null>(null)

     useEffect(() => {
          const fetchPost = async () => {
               try {
                    setIsLoading(true)
                    const result = await postApi.getById(id)
                    setData(result)
                    setError(null)
               } catch (err) {
                    setError(err as Error)
               } finally {
                    setIsLoading(false)
               }
          }

          if (id) {
               fetchPost()
          }
     }, [id])

     const refetch = async () => {
          try {
               setIsLoading(true)
               const result = await postApi.getById(id)
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
