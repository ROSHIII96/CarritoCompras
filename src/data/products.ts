// ── Tipos ──────────────────────────────────────────────────────────
export interface Product {
  id: number
  name: string
  /** Modelo exacto del producto */
  model: string
  price: number
  /** Emoji de respaldo mientras no haya imagen real */
  emoji: string
  category: string
  /**
   * Ruta relativa a /public.
   * Coloca los archivos en public/images/ y actualiza la ruta aquí.
   * Ejemplo: '/images/macbook-air-m2.jpg'
   */
  image: string
}

// ── Catálogo — precios en colones costarricenses (₡) ──────────────
// Precios de referencia según mercado CR (2024).
// Fuente: Electronica Americana, Best Buy CR, importaciones directas.
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'MacBook Air 13"',
    model: 'Apple MacBook Air M2 — 8 GB RAM / 256 GB SSD',
    price: 469000,
    emoji: '💻',
    category: 'Laptops',
    image: '/images/macbook-air-m2.jpg',
  },
  {
    id: 2,
    name: 'Mouse Logitech MX Master 3S',
    model: 'Logitech MX Master 3S — Inalámbrico, 8000 DPI, Bolt USB',
    price: 52000,
    emoji: '🖱️',
    category: 'Periféricos',
    image: '/images/logitech-mx-master-3s.jpg',
  },
  {
    id: 3,
    name: 'Teclado Corsair K70 RGB',
    model: 'Corsair K70 RGB Pro — Cherry MX Red, USB, Anti-ghosting',
    price: 72000,
    emoji: '⌨️',
    category: 'Periféricos',
    image: '/images/corsair-k70-rgb-pro.jpg',
  },
  {
    id: 4,
    name: 'Monitor LG 27" 4K',
    model: 'LG 27UK850-W — 4K UHD IPS, HDR10, USB-C 60W',
    price: 215000,
    emoji: '🖥️',
    category: 'Monitores',
    image: '/images/lg-27uk850-w.jpg',
  },
  {
    id: 5,
    name: 'Auriculares Sony XM5',
    model: 'Sony WH-1000XM5 — ANC, Bluetooth 5.2, 30h batería',
    price: 162000,
    emoji: '🎧',
    category: 'Audio',
    image: '/images/sony-wh-1000xm5.jpg',
  },
  {
    id: 6,
    name: 'Webcam Logitech C920s',
    model: 'Logitech C920s HD Pro — 1080p 30fps, campo visual 78°',
    price: 48000,
    emoji: '📷',
    category: 'Cámaras',
    image: '/images/logitech-c920s.jpg',
  },
]
