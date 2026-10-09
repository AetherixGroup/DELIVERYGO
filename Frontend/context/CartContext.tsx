'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import type { CartItem, Product, Cart, SelectedOption } from '@/types'

// ─── Utility to create unique cart item key ──────────────────
export function generateCartItemId(productId: string, options?: SelectedOption[], observations?: string): string {
  const optionsKey = options && options.length > 0
    ? options.map(o => `${o.groupId}:${o.optionId}`).sort().join('|')
    : 'none'
  const obsKey = observations ? observations.trim().toLowerCase() : ''
  return `${productId}__${optionsKey}__${obsKey}`
}

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
  | {
      type: 'ADD_ITEM'
      payload: {
        product: Product
        selectedOptions?: SelectedOption[]
        observations?: string
        quantity?: number
      }
    }
  | { type: 'REMOVE_ITEM'; payload: string } // payload is cartItemId
  | { type: 'INCREASE_QTY'; payload: string }
  | { type: 'DECREASE_QTY'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

// ─── Reducer ─────────────────────────────────────────────────
function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.unitPriceWithExtras * i.quantity, 0),
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...action.payload, isOpen: false }

    case 'ADD_ITEM': {
      const { product, selectedOptions = [], observations = '', quantity = 1 } = action.payload
      const extrasCost = selectedOptions.reduce((acc, opt) => acc + (opt.price || 0), 0)
      const unitPriceWithExtras = product.price + extrasCost
      const cartItemId = generateCartItemId(product.id, selectedOptions, observations)

      const existingIndex = state.items.findIndex(i => generateCartItemId(i.product.id, i.selectedOptions, i.observations) === cartItemId)
      let newItems: CartItem[]

      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        const newItem: CartItem = {
          product,
          quantity,
          selectedOptions,
          observations,
          unitPriceWithExtras,
        }
        newItems = [...state.items, newItem]
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
      const targetKey = action.payload
      const newItems = state.items.filter(
        i => generateCartItemId(i.product.id, i.selectedOptions, i.observations) !== targetKey
      )
      return {
        ...state,
        items: newItems,
        businessId: newItems.length === 0 ? null : state.businessId,
        businessName: newItems.length === 0 ? null : state.businessName,
        ...calcTotals(newItems),
      }
    }
    case 'INCREASE_QTY': {
      const targetKey = action.payload
      const newItems = state.items.map(i =>
        generateCartItemId(i.product.id, i.selectedOptions, i.observations) === targetKey
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
      return { ...state, items: newItems, ...calcTotals(newItems) }
    }
    case 'DECREASE_QTY': {
      const targetKey = action.payload
      const newItems = state.items
        .map(i =>
          generateCartItemId(i.product.id, i.selectedOptions, i.observations) === targetKey
            ? { ...i, quantity: i.quantity - 1 }
            : i
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

// ─── Context Interface ───────────────────────────────────────
interface CartContextValue {
  state: CartState
  addItem: (product: Product, selectedOptions?: SelectedOption[], observations?: string, quantity?: number) => void
  removeItem: (cartItemId: string) => void
  increaseQty: (cartItemId: string) => void
  decreaseQty: (cartItemId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getItemQty: (productId: string) => number
  deliveryFee: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = 'deliverygo_cart_v2'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage safely on mount (client side only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: 'LOAD_CART', payload: parsed })
        }
      }
    } catch {
      // Ignore errors reading local storage
    }
  }, [])

  // Save cart to localStorage on state changes
  useEffect(() => {
    try {
      const { isOpen, ...toSave } = state
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // Ignore errors writing local storage
    }
  }, [state])

  const addItem = useCallback(
    (product: Product, selectedOptions?: SelectedOption[], observations?: string, quantity: number = 1) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: { product, selectedOptions, observations, quantity },
      })
    },
    []
  )

  const removeItem = useCallback((key: string) => dispatch({ type: 'REMOVE_ITEM', payload: key }), [])
  const increaseQty = useCallback((key: string) => dispatch({ type: 'INCREASE_QTY', payload: key }), [])
  const decreaseQty = useCallback((key: string) => dispatch({ type: 'DECREASE_QTY', payload: key }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])

  const getItemQty = useCallback(
    (productId: string) =>
      state.items
        .filter(i => i.product.id === productId)
        .reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  )

  const deliveryFee = state.items.length > 0 ? 3 : 0
  const total = state.subtotal + deliveryFee

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        getItemQty,
        deliveryFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
