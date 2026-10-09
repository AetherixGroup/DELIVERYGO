// ============================================================
// DELIVERYGO — Core Types
// ============================================================

export type BusinessCategory =
  | 'pizzeria'
  | 'licoreria'
  | 'cevicheria'
  | 'restaurant'
  | 'fastfood'
  | 'cafeteria'
  | 'parrilla'
  | 'sushi'
  | 'pollo'

export interface Business {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: BusinessCategory
  logo: string
  coverImage: string
  bannerImages: string[]
  isOpen: boolean
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  minimumOrder: number
  address: string
  phone: string
  tags: string[]
  featured: boolean
}

export interface ProductOptionValue {
  id: string
  name: string
  price: number // Extra price in PEN (0 if included)
}

export interface ProductOptionGroup {
  id: string
  name: string // e.g. "Tamaño", "Sabor de Pizza", "Adicionales"
  required: boolean
  minSelections?: number
  maxSelections?: number
  values: ProductOptionValue[]
}

export interface Product {
  id: string
  businessId: string
  businessName: string
  businessSlug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  available: boolean
  featured: boolean
  isOffer: boolean
  ml?: string
  tags: string[]
  optionGroups?: ProductOptionGroup[]
}

export interface SelectedOption {
  groupId: string
  groupName: string
  optionId: string
  optionName: string
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedOptions?: SelectedOption[]
  observations?: string
  unitPriceWithExtras: number
}

export interface Cart {
  items: CartItem[]
  businessId: string | null
  businessName: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count: number
  businessCategory?: BusinessCategory
}

export interface FavoritesState {
  productIds: string[]
}

export interface Order {
  id: string
  items: CartItem[]
  status: 'pending' | 'confirmed' | 'preparing' | 'on_way' | 'delivered'
  total: number
  deliveryFee: number
  address: string
  createdAt: Date
  estimatedTime: string
}

export interface CheckoutData {
  name: string
  phone: string
  address: string
  reference: string
  deliveryMethod: 'delivery' | 'pickup'
  paymentMethod: 'cash' | 'yape' | 'plin' | 'card'
}
