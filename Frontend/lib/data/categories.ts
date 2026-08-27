import type { Category } from '@/types'

export const categories: Category[] = [
  { id: 'all',        name: 'Todo',       slug: 'all',       icon: '🏪', count: 40 },
  { id: 'pizzeria',   name: 'Pizzerías',  slug: 'pizzeria',  icon: '🍕', count: 8,  businessCategory: 'pizzeria' },
  { id: 'licoreria',  name: 'Licorería',  slug: 'licoreria', icon: '🥃', count: 22, businessCategory: 'licoreria' },
  { id: 'cevicheria', name: 'Cevichería', slug: 'cevicheria',icon: '🐟', count: 6,  businessCategory: 'cevicheria' },
  { id: 'restaurant', name: 'Restaurantes',slug:'restaurant',icon: '🍽️', count: 4,  businessCategory: 'restaurant' },
  { id: 'parrilla',   name: 'Parrillas',  slug: 'parrilla',  icon: '🔥', count: 5,  businessCategory: 'parrilla' },
  { id: 'fastfood',   name: 'Fast Food',  slug: 'fastfood',  icon: '🍔', count: 3,  businessCategory: 'fastfood' },
  { id: 'cafeteria',  name: 'Cafeterías', slug: 'cafeteria', icon: '☕', count: 2,  businessCategory: 'cafeteria' },
]
