import type { Business } from '@/types'

export const businesses: Business[] = [
  // ─── PIZZERÍA D'LU ──────────────────────────────────────────
  {
    id: 'pizzeria-dlu',
    slug: 'pizzeria-dlu',
    name: "Pizzeria D'Lu",
    tagline: 'Las mejores pizzas de Santa Clara',
    description:
      'Pizzería artesanal con más de 5 años en Santa Clara. Pizzas familiares, medianas y personales al horno. Ingredientes frescos, masa artesanal y la famosa salsa mediterránea que nos distingue.',
    category: 'pizzeria',
    logo: '/images/logo de pizzeria D´LU.png',
    coverImage: '/images/2 pizzas familiares americana y hawaina.jpeg',
    bannerImages: [
      '/images/1 pizza familiar - 1 pizza mediana (americana,hawaina).jpeg',
      '/images/2 pizzas familiares clasicas(americana,hawaina).jpeg',
      '/images/2 pizzas medianas (americana,hawaina).jpeg',
      '/images/2 pizzas medianas clasicas ( americana,hawaiana).jpeg',
    ],
    isOpen: true,
    rating: 4.8,
    reviewCount: 312,
    deliveryTime: '30-45 min',
    deliveryFee: 3,
    minimumOrder: 20,
    address: 'Santa Clara, Lima',
    phone: '997760161',
    tags: ['Pizzas', 'Combos', 'Delivery'],
    featured: true,
  },

  // ─── LICORERÍA PREAFT ───────────────────────────────────────
  {
    id: 'licoreria-preaft',
    slug: 'licoreria-preaft',
    name: 'Licorería Preaft',
    tagline: 'Tu licorería express favorita',
    description:
      'La mejor selección de licores, cervezas y bebidas premium. Whiskies, rones, vodkas, pisco y más. Entrega rápida a domicilio en toda la zona.',
    category: 'licoreria',
    logo: '/images/logo de preaft.jpeg',
    coverImage: '/images/JACK DANIELS  750 ML.png',
    bannerImages: [
      '/images/JACK DANIELS  750 ML.png',
      '/images/BLACK LABEL  750 ML.png',
      '/images/RON HAVANA CLUB.png',
    ],
    isOpen: true,
    rating: 4.6,
    reviewCount: 188,
    deliveryTime: '20-35 min',
    deliveryFee: 2,
    minimumOrder: 30,
    address: 'Santa Clara, Lima',
    phone: '993186933',
    tags: ['Licores', 'Cervezas', 'Bebidas', 'Premium'],
    featured: true,
  },

  // ─── CEVICHERÍA EL MUELLE ───────────────────────────────────
  {
    id: 'cevicheria-el-muelle',
    slug: 'cevicheria-el-muelle',
    name: 'Cevichería El Muelle',
    tagline: 'El sabor del mar en tu mesa',
    description:
      'Auténtica cevichería peruana con los mejores ingredientes frescos del mar. Ceviche clásico, leche de tigre, arroz con mariscos, chicharrón de calamar y mucho más.',
    category: 'cevicheria',
    logo: '/images/ceviche-clasico.jpg',
    coverImage: '/images/cevicheria-banner.jpg',
    bannerImages: ['/images/cevicheria-banner.jpg', '/images/ceviche-clasico.jpg'],
    isOpen: true,
    rating: 4.7,
    reviewCount: 256,
    deliveryTime: '35-50 min',
    deliveryFee: 4,
    minimumOrder: 25,
    address: 'Ate Vitarte, Lima',
    phone: '987654321',
    tags: ['Ceviche', 'Mariscos', 'Comida Peruana'],
    featured: true,
  },

  // ─── DON BRASA ──────────────────────────────────────────────
  {
    id: 'don-brasa',
    slug: 'don-brasa',
    name: 'Don Brasa',
    tagline: 'Pollo y parrilla al carbón',
    description:
      'Restaurante especializado en pollo a la brasa, parrillas y anticuchos. Leña y carbón natural para el mejor sabor. Incluye ensalada, papa y salsas caseras.',
    category: 'parrilla',
    logo: '',
    coverImage: '/images/WhatsApp Image 2026-08-04 at 17.30.57.jpeg',
    bannerImages: ['/images/WhatsApp Image 2026-08-04 at 17.30.57.jpeg'],
    isOpen: false,
    rating: 4.5,
    reviewCount: 143,
    deliveryTime: '40-55 min',
    deliveryFee: 3,
    minimumOrder: 20,
    address: 'Santa Clara, Lima',
    phone: '976543210',
    tags: ['Pollo', 'Parrilla', 'Anticuchos'],
    featured: false,
  },
]
