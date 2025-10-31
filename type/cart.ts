export interface CartItem {
     id: string
     image: string
     title: string
     author: string
     price: number
     originalPrice?: number
     quantity: number
}

export interface OrderSummary {
     subtotal: number
     shipping: number
     total: number
     itemCount: number
}
