import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface Props {
  products: Product[]
  showBusiness?: boolean
}

export default function ProductGrid({ products, showBusiness = true }: Props) {
  if (products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 24px',
        background: 'var(--bg-surface-2)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
      }}>
        <p style={{ fontSize: '2rem', marginBottom: 12 }}>🍽️</p>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Sin productos disponibles</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Pronto agregaremos más opciones.
        </p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} showBusiness={showBusiness} />
      ))}
    </div>
  )
}
