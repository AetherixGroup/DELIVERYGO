'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { products } from '@/lib/data/products'
import type { Product } from '@/types'
import { formatPEN } from '@/lib/utils'

interface Props {
  onResults?: (results: Product[]) => void
  placeholder?: string
}

export default function SearchBar({ onResults, placeholder = 'Busca pizzas, licores, ceviche...' }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setShowResults(false)
      onResults?.([])
      return
    }
    const q = query.toLowerCase()
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.businessName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8)
    setResults(found)
    setShowResults(true)
    onResults?.(found)
  }, [query, onResults])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const clear = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
    onResults?.([])
  }

  return (
    <div className="search-bar" ref={ref} style={{ position: 'relative' }}>
      <Search size={18} className="search-bar-icon" aria-hidden="true" />
      <input
        type="search"
        className="input"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowResults(true)}
        aria-label="Buscar productos"
        aria-expanded={showResults}
        aria-controls="searchbar-results"
        role="combobox"
        aria-autocomplete="list"
      />
      {query && (
        <button
          onClick={clear}
          style={{
            position: 'absolute', right: 14, top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            padding: 4,
          }}
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}

      {showResults && results.length > 0 && (
        <div
          id="searchbar-results"
          style={{
            position: 'absolute', top: '110%', left: 0, right: 0,
            background: 'var(--bg-surface-4)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            zIndex: 200,
            boxShadow: 'var(--shadow-lg)',
            maxHeight: 400,
            overflowY: 'auto',
          }}
          role="listbox"
        >
          {results.map(p => (
            <div
              key={p.id}
              role="option"
              aria-selected={false}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: 'var(--bg-surface-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', flexShrink: 0,
              }}>
                🍽️
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{p.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {p.businessName} · {formatPEN(p.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, right: 0,
          background: 'var(--bg-surface-4)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          textAlign: 'center',
          zIndex: 200,
          boxShadow: 'var(--shadow-lg)',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No se encontraron resultados para &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
