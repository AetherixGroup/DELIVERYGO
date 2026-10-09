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
const BASE_PATH = process.env.__NEXT_ROUTER_BASEPATH || ''

export function getAssetPath(path?: string, fallback: string = '/images/placeholder.png'): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback
  }

  let cleanPath = path.trim()

  // Normalize any legacy/duplicated basePath prefix so it is never added twice
  cleanPath = cleanPath.replace(/^(\.|\/)?DELIVERYGO/i, '')

  // Ensure leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath
  }

  // next/image with `unoptimized` (required by `output: 'export'`) returns the
  // `src` verbatim and does NOT prepend the Next.js basePath, so files served
  // from `public/` must be prefixed manually to avoid 404s on subpath deploys.
  if (BASE_PATH && !cleanPath.startsWith(BASE_PATH + '/')) {
    cleanPath = BASE_PATH + cleanPath
  }

  return cleanPath
}

/**
 * Classnames join utility helper
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

