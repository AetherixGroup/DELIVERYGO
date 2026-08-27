'use client'

import { Pizza, Wine, Fish, UtensilsCrossed, Flame, Zap, Coffee, LayoutGrid } from 'lucide-react'
import type { Category } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  all:        <LayoutGrid size={22} />,
  pizzeria:   <Pizza size={22} />,
  licoreria:  <Wine size={22} />,
  cevicheria: <Fish size={22} />,
  restaurant: <UtensilsCrossed size={22} />,
  parrilla:   <Flame size={22} />,
  fastfood:   <Zap size={22} />,
  cafeteria:  <Coffee size={22} />,
}

interface Props {
  category: Category
  active?: boolean
  onClick: () => void
}

export default function CategoryCard({ category, active, onClick }: Props) {
  return (
    <button
      className={`category-card${active ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Filtrar por ${category.name}`}
    >
      <div className="category-icon-wrap">
        {iconMap[category.id] ?? <UtensilsCrossed size={22} />}
      </div>
      <span className="category-name">{category.name}</span>
      <span className="category-count">{category.count} opciones</span>
    </button>
  )
}
