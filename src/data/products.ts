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
    image: 'https://cr.tiendasishop.com/cdn/shop/files/IMG-5577520_6b8ebc93-9195-47b0-9bb3-77bffd33dcd5.jpg?v=1734627576&width=823',
  },
  {
    id: 2,
    name: 'Mouse Logitech MX Master 3S',
    model: 'Logitech MX Master 3S — Inalámbrico, 8000 DPI, Bolt USB',
    price: 52000,
    emoji: '🖱️',
    category: 'Periféricos',
    image: 'https://extremetechcr.com/wp-content/uploads/2024/11/22248.jpg',
  },
  {
    id: 3,
    name: 'Teclado Corsair K70 RGB',
    model: 'Corsair K70 RGB Pro — Cherry MX Red, USB, Anti-ghosting',
    price: 72000,
    emoji: '⌨️',
    category: 'Periféricos',
    image: 'https://holacompras.com/wp-content/uploads/2021/06/CH-9109014-SP-Prod.jpg',
  },
  {
    id: 4,
    name: 'Monitor LG 27" 4K',
    model: 'LG 27UK850-W — 4K UHD IPS, HDR10, USB-C 60W',
    price: 215000,
    emoji: '🖥️',
    category: 'Monitores',
    image: 'https://www.coolmod.com/images/product/large/lg-27ul650-w-gaming-27-4k-freesync-monitor-001.jpg',
  },
  {
    id: 5,
    name: 'Auriculares Sony XM5',
    model: 'Sony WH-1000XM5 — ANC, Bluetooth 5.2, 30h batería',
    price: 162000,
    emoji: '🎧',
    category: 'Audio',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/360-RA-category-icon-20221202?$S7Product$&fmt=png-alpha',
  },
  {
    id: 6,
    name: 'Webcam Logitech C920s',
    model: 'Logitech C920s HD Pro — 1080p 30fps, campo visual 78°',
    price: 48000,
    emoji: '📷',
    category: 'Cámaras',
    image: 'https://media.4rgos.it/i/Argos/3118607_R_Z001A?w=500&h=300',
  },
]
