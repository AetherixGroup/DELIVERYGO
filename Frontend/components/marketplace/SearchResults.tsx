'use client'

import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface Props {
  results: Product[]
  query: string
  loading?: boolean
}

export default function SearchResults({ results, query, loading }: Props) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <div className="animate-spin" style={{
          width: 32, height: 32,
          border: '3px solid var(--bg-surface-4)',
          borderTopColor: 'var(--brand-primary)',
          borderRadius: '50%',
        }} />
      </div>
    )
  }

  if (!query || query.length < 2) return null

  if (results.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '48px 24px',
        background: 'var(--bg-surface-2)', borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
      }}>
        <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>
          Sin resultados para &quot;{query}&quot;
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Intenta con otro término de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para &quot;{query}&quot;
      </p>
      <div className="product-grid">
        {results.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
