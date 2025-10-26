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
     },

     // Tạo post mới
     create: async (formData: FormData) => {
          const res = await apiClient.post(endpoints.post.all, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          })
          return res.data
     },

     // Like post
     likePost: async (postId: string) => {
          const res = await apiClient.post(endpoints.post.like(postId))
          return res.data
     },

     // Unlike post
     unlikePost: async (postId: string) => {
          const res = await apiClient.delete(endpoints.post.like(postId))
          return res.data
     },

     // Thêm comment
     addComment: async (postId: string, content: string) => {
          const res = await apiClient.post(endpoints.post.comments(postId), { content })
          return res.data
     },

     // Lấy comments của post
     getComments: async (postId: string) => {
          const res = await apiClient.get(endpoints.post.comments(postId))
          return res.data
     },
}
