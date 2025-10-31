export interface ImagePair {
     before: string
     after: string
}

export interface PresetFile {
     url: string
     fileName: string
     fileSize?: number
     format: string
}

export interface MarketplaceItem {
     id: string
     title: string
     description: string
     price: number
     salePrice?: number
     imagePairs: ImagePair[]
     thumbnail: string
     author: {
          name: string
          avatar: string
     }
     presetFile: PresetFile
     rating?: number
     software?: string
}
