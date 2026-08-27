'use client'

import { SlidersHorizontal, X } from 'lucide-react'

interface FilterPanelProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (cat: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export default function FilterPanel({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'center',
    }}>
      {/* Category filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => onCategoryChange(cat)}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {cat}
            {activeCategory === cat && cat !== 'Todos' && (
              <X size={12} style={{ marginLeft: 4 }} />
            )}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        className="input"
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        style={{
          width: 'auto',
          padding: '6px 12px',
          fontSize: '0.8rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-surface-3)',
        }}
        aria-label="Ordenar productos"
      >
        <option value="default">Ordenar por</option>
        <option value="price-asc">Menor precio</option>
        <option value="price-desc">Mayor precio</option>
        <option value="name">Nombre</option>
      </select>
    </div>
  )
}
