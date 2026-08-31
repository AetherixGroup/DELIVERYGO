/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  basePath: '/DELIVERYGO',
  assetPrefix: '/DELIVERYGO/',

  images: {
    unoptimized: true,
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig