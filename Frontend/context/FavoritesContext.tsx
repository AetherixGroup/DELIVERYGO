'use client'

import React, { createContext, useContext, useReducer, useCallback } from 'react'

interface FavoritesState {
  productIds: Set<string>
}

type FavoritesAction =
  | { type: 'TOGGLE'; payload: string }
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: string }

function favReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  const next = new Set(state.productIds)
  switch (action.type) {
    case 'TOGGLE':
      next.has(action.payload) ? next.delete(action.payload) : next.add(action.payload)
      return { productIds: next }
    case 'ADD':
      next.add(action.payload)
      return { productIds: next }
    case 'REMOVE':
      next.delete(action.payload)
      return { productIds: next }
    default:
      return state
  }
}

interface FavoritesContextValue {
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favReducer, { productIds: new Set<string>() })

  const isFavorite = useCallback((id: string) => state.productIds.has(id), [state.productIds])
  const toggle = useCallback((id: string) => dispatch({ type: 'TOGGLE', payload: id }), [])

  return (
    <FavoritesContext.Provider value={{ isFavorite, toggle, count: state.productIds.size }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
