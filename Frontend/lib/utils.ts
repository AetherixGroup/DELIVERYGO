/**
 * Utility functions for DELIVERYGO Frontend
 */

/**
 * Formats a numeric price into Peruvian Soles (S/) format.
 * Example: 12.9 -> "S/ 12.90"
 */
export function formatPEN(amount: number): string {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(safeAmount)
    .replace('PEN', 'S/')
    .trim()
}

/**
 * Normalizes asset image paths to prevent double basePath issues
 * and handle fallback default images cleanly.
 */
export function getAssetPath(path?: string, fallback: string = '/images/placeholder.png'): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback
  }

  let cleanPath = path.trim()

  // Remove leading './DELIVERYGO' or '/DELIVERYGO' if present
  cleanPath = cleanPath.replace(/^(\.|\/)?DELIVERYGO/i, '')

  // Ensure leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath
  }

  // Next.js Image component handles basePath automatically when output: 'export' and basePath is set in next.config.mjs.
  // For standard <img> tags or CSS backgrounds, if basePath prefix is needed, it can be prefixed.
  return cleanPath
}

/**
 * Classnames join utility helper
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

