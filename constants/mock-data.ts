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

export const MOCK_POSTS: Post[] = [
     {
          id: '1',
          user: {
               username: 'baotrong.lens',
               avatar: 'https://i.pravatar.cc/150?img=12',
          },
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
          caption: 'Golden hour magic ✨📸',
          likes: 1243,
          isLiked: false,
          comments: 89,
          timeAgo: '2h',
     },
     {
          id: '2',
          user: {
               username: 'kimlong.photo',
               avatar: 'https://i.pravatar.cc/150?img=33',
          },
          image: 'https://images.unsplash.com/photo-1682687221038-404670f09439?w=800',
          caption: 'Street photography vibes 🏙️',
          likes: 892,
          isLiked: true,
          comments: 45,
          timeAgo: '5h',
     },
     {
          id: '3',
          user: {
               username: 'truonghuy.captures',
               avatar: 'https://i.pravatar.cc/150?img=8',
          },
          image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800',
          caption: 'Nature at its finest 🌿',
          likes: 2156,
          isLiked: false,
          comments: 134,
          timeAgo: '1d',
     },
     {
          id: '4',
          user: {
               username: 'lens.daily',
               avatar: 'https://i.pravatar.cc/150?img=25',
          },
          image: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?w=800',
          caption: 'Minimal aesthetic 🎨',
          likes: 3421,
          isLiked: true,
          comments: 267,
          timeAgo: '2d',
     },
     {
          id: '5',
          user: {
               username: 'photographer.vn',
               avatar: 'https://i.pravatar.cc/150?img=15',
          },
          image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800',
          caption: 'Behind the lens 📷',
          likes: 987,
          isLiked: false,
          comments: 56,
          timeAgo: '3d',
     },
]
