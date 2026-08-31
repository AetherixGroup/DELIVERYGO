import { businesses } from '@/lib/data/businesses'
import BusinessDetailClient from './BusinessDetailClient'

export function generateStaticParams() {
  return businesses.map((business) => ({
    slug: business.slug,
  }))
}

interface BusinessPageProps {
  params: {
    slug: string
  }
}

export default function BusinessDetailPage({
  params,
}: BusinessPageProps) {
  return <BusinessDetailClient slug={params.slug} />
}