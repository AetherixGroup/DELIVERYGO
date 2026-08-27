'use client'

import React, { createContext, useContext, useReducer, useCallback } from 'react'
import type { CartItem, Product, Cart } from '@/types'

// ─── State ───────────────────────────────────────────────────
interface CartState extends Cart {
  isOpen: boolean
  totalItems: number
  subtotal: number
}

const initialState: CartState = {
  items: [],
  businessId: null,
  businessName: null,
  isOpen: false,
  totalItems: 0,
  subtotal: 0,
}

// ─── Actions ─────────────────────────────────────────────────
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREASE_QTY'; payload: string }
  | { type: 'DECREASE_QTY'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }

// ─── Reducer ─────────────────────────────────────────────────
function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload
      const existing = state.items.find(i => i.product.id === product.id)
      let newItems: CartItem[]

      if (existing) {
        newItems = state.items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        newItems = [...state.items, { product, quantity: 1 }]
      }

      return {
        ...state,
        items: newItems,
        businessId: product.businessId,
        businessName: product.businessName,
        isOpen: true,
        ...calcTotals(newItems),
      }
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(i => i.product.id !== action.payload)
      return {
        ...state,
        items: newItems,
        businessId: newItems.length === 0 ? null : state.businessId,
        businessName: newItems.length === 0 ? null : state.businessName,
        ...calcTotals(newItems),
      }
    }
    case 'INCREASE_QTY': {
      const newItems = state.items.map(i =>
        i.product.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
      )
      return { ...state, items: newItems, ...calcTotals(newItems) }
    }
    case 'DECREASE_QTY': {
      const newItems = state.items
        .map(i =>
          i.product.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
      return {
        ...state,
        items: newItems,
        businessId: newItems.length === 0 ? null : state.businessId,
        businessName: newItems.length === 0 ? null : state.businessName,
        ...calcTotals(newItems),
      }
    }
    case 'CLEAR_CART':
      return { ...initialState }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────
interface CartContextValue {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  increaseQty: (productId: string) => void
  decreaseQty: (productId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getItemQty: (productId: string) => number
  deliveryFee: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = useCallback((product: Product) => dispatch({ type: 'ADD_ITEM', payload: product }), [])
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id }), [])
  const increaseQty = useCallback((id: string) => dispatch({ type: 'INCREASE_QTY', payload: id }), [])
  const decreaseQty = useCallback((id: string) => dispatch({ type: 'DECREASE_QTY', payload: id }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const getItemQty = useCallback((id: string) => state.items.find(i => i.product.id === id)?.quantity ?? 0, [state.items])

  const deliveryFee = state.items.length > 0 ? 3 : 0
  const total = state.subtotal + deliveryFee

  return (
    <CartContext.Provider value={{
      state, addItem, removeItem, increaseQty, decreaseQty,
      clearCart, openCart, closeCart, toggleCart, getItemQty,
      deliveryFee, total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
