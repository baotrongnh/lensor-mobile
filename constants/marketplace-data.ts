export interface MarketplaceProduct {
     id: number
     title: string
     description: string
     price: number
     image: string
     author: {
          name: string
          avatar: string
     }
     rating: number
     software: 'lightroom' | 'photoshop' | 'all'
     category: string
     tags: string[]
     images?: string[]
     features?: string[]
     compatibility?: string[]
     fileFormat?: string
     fileSize?: string
     reviewCount?: number
     downloads?: number
}

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
     {
          id: 1,
          title: 'Urban Photography Preset',
          description: 'Professional preset pack for urban street photography with moody tones.',
          price: 15.99,
          image: 'https://i.pinimg.com/1200x/3e/d5/5b/3ed55b7a8edad9e811900cd55ca50f05.jpg',
          author: {
               name: 'Alex Chen',
               avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          rating: 3.8,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Urban', 'Moody', 'Street'],
          reviewCount: 124,
          downloads: 856,
     },
     {
          id: 2,
          title: 'Nature Portrait Collection',
          description: 'Beautiful nature portraits with natural lighting and vibrant colors.',
          price: 24.99,
          image: 'https://i.pinimg.com/1200x/d9/b2/97/d9b29715b473dd0a5b37e1bc9929907b.jpg',
          author: {
               name: 'Sarah Martinez',
               avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          rating: 4.9,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Nature', 'Portrait', 'Vibrant'],
          reviewCount: 347,
          downloads: 2156,
     },
     {
          id: 3,
          title: 'Vintage Film Presets',
          description: 'Classic film look presets for that authentic vintage aesthetic.',
          price: 12.99,
          image: 'https://i.pinimg.com/736x/3f/93/c6/3f93c61810a9a68442366031087841a9.jpg',
          author: {
               name: 'Mike Johnson',
               avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
          },
          rating: 4.7,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Vintage', 'Film', 'Classic'],
          reviewCount: 203,
          downloads: 1452,
     },
     {
          id: 4,
          title: 'Cinematic Orange & Teal',
          description: 'Professional color grading inspired by blockbuster films.',
          price: 29.99,
          image: 'https://i.pinimg.com/1200x/91/a5/61/91a5617f6bea6f3edfdc9ecefc819911.jpg',
          author: {
               name: 'Alex Martinez',
               avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
          },
          rating: 4.8,
          software: 'photoshop',
          category: 'Color Grading',
          tags: ['Cinematic', 'Orange & Teal', 'Professional'],
          reviewCount: 347,
          downloads: 2840,
          images: [
               'https://i.pinimg.com/1200x/91/a5/61/91a5617f6bea6f3edfdc9ecefc819911.jpg',
               'https://i.pinimg.com/1200x/ff/92/35/ff9235cd827885e439aef1bb9e153754.jpg',
               'https://i.pinimg.com/1200x/3e/c8/25/3ec825e68f5f5c10878cdc11f83026d1.jpg',
               'https://i.pinimg.com/736x/71/0d/a4/710da45e47f2a3a144ce76530e0c7d55.jpg',
          ],
          features: [
               '15 premium presets',
               'Works with RAW and JPEG',
               'Mobile & Desktop compatible',
               'Lifetime updates',
               'Video tutorial included',
               'Instant download',
          ],
          compatibility: ['Lightroom Classic', 'Lightroom CC', 'Photoshop ACR'],
          fileFormat: '.xmp',
          fileSize: '2.4 MB',
     },
     {
          id: 5,
          title: 'Moody Landscape Presets',
          description: 'Dark and dramatic tones for stunning landscape photography.',
          price: 17.99,
          image: 'https://i.pinimg.com/736x/fd/ac/3c/fdac3cc7c47d3fa7a0df6bce7be249eb.jpg',
          author: {
               name: 'Liam Brown',
               avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          },
          rating: 4.7,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Moody', 'Landscape', 'Dramatic'],
          reviewCount: 189,
          downloads: 1234,
     },
     {
          id: 6,
          title: 'Golden Hour Magic',
          description: 'Warm presets to enhance golden hour and sunset photos.',
          price: 18.5,
          image: 'https://i.pinimg.com/1200x/29/fd/cc/29fdccf1df70d964d1b1be7ef163b594.jpg',
          author: {
               name: 'Olivia Green',
               avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          },
          rating: 4.9,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Golden Hour', 'Sunset', 'Warm'],
          reviewCount: 421,
          downloads: 3102,
     },
     {
          id: 7,
          title: 'Black & White Mastery',
          description: 'High-contrast black and white presets for timeless photography.',
          price: 14.0,
          image: 'https://i.pinimg.com/1200x/da/01/9c/da019c2984b8381140b07c17ca3fb353.jpg',
          author: {
               name: 'Ethan White',
               avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
          },
          rating: 4.6,
          software: 'lightroom',
          category: 'Photography Preset',
          tags: ['Black & White', 'Contrast', 'Timeless'],
          reviewCount: 156,
          downloads: 892,
     },
     {
          id: 8,
          title: 'Travel Explorer Presets',
          description: 'Vibrant presets perfect for travel bloggers and explorers.',
          price: 22.0,
          image: 'https://i.pinimg.com/736x/39/b3/be/39b3be05e8e691e67032df91f831225e.jpg',
          author: {
               name: 'Isabella Cruz',
               avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
          },
          rating: 4.8,
          software: 'photoshop',
          category: 'Photography Preset',
          tags: ['Travel', 'Vibrant', 'Explorer'],
          reviewCount: 278,
          downloads: 1876,
     },
]
