import { useState } from 'react'
import { PRODUCTS, type Product } from './data/products'

// HOISTING Las declaraciones de función se elevan al inicio del
// scope. formatCurrency() se usa en línea 10 pero se declara en
// línea 20 — funciona porque JS la "hoist" antes de ejecutar.

const _test = formatCurrency(0) // llamada antes de la declaración 
void _test

// [HOISTING] Declaración de función — JS la eleva completa al scope
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Types 
interface CartItem extends Product {
  qty: number
}

// 
// CLOSURE createCartManager devuelve métodos que "cierran sobre"
// la variable `items`. Es inaccesible desde fuera: nadie puede
// hacer cartManager.items — solo puede interactuar a través de
// los métodos retornados. Esto es el patrón Module via Closure.
//
// [SCOPE] `items` vive en el scope de la función createCartManager.
// Cada llamada a createCartManager() crea un scope independiente,
// por eso un segundo carrito tendría su propio `items` separado.

function createCartManager() {
  // SCOPE Variable privada — solo existe dentro de este scope
  // CLOSURE Los métodos retornados "recuerdan" este `items`
  let items: CartItem[] = []

  return {
    add(product: Product): CartItem[] {
      // CLOSURE Accedemos a `items` del scope exterior ↑
      const existing = items.find((i) => i.id === product.id)
      if (existing) {
        items = items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      } else {
        items = [...items, { ...product, qty: 1 }]
      }
      return [...items]
    },

    remove(id: number): CartItem[] {
      // CLOSURE Mutamos `items` privado y devolvemos copia
      items = items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
      return [...items]
    },

    clear(): CartItem[] {
      items = []
      return []
    },

    getCount(): number {
      // CLOSURE Lectura de `items` sin exponerlo directamente
      return items.reduce((sum, i) => sum + i.qty, 0)
    },
  }
}

// CLOSURE Instancia singleton — el closure se crea una sola vez
// y mantiene su estado privado durante toda la vida de la app.
const cartManager = createCartManager()

//  Componente principal 
export default function App() {
  // SCOPE Variables de estado con scope de bloque (let interno de useState)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Valores derivados
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  //  Handlers 
  // CLOSURE Cada handler cierra sobre `setCartItems` y `cartManager`
  // del scope del componente — los "recuerda" sin recibirlos por param.
  function handleAdd(product: Product) {
    setCartItems(cartManager.add(product))
  }

  function handleRemove(id: number) {
    setCartItems(cartManager.remove(id))
  }

  function handleClear() {
    setCartItems(cartManager.clear())
    setIsCartOpen(false)
  }

  // ── Render 
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar  */}
      <header className="bg-brand-500 text-white px-6 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛍️</span>
            <h1 className="text-xl font-bold tracking-tight">TechShop</h1>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <span>🛒</span>
            <span>Carrito</span>
            {/* SCOPE totalItems está en el scope del componente */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/*  Catálogo de productos  */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Catálogo</h2>
          <p className=" text-slate-500 mt-1 text-sm">
            {PRODUCTS.length} productos disponibles
          </p>
        </div>

        {/* SCOPE `product` e `inCart` tienen scope de bloque por
            iteración — cada tarjeta tiene sus propias variables. */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => {
            const inCart = cartItems.find((i) => i.id === product.id)

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                {/* Imagen del producto — con emoji como fallback */}
                <div className="hover:scale-110 rounded-xl overflow-hidden mb-4 bg-brand-50 h-40 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Si la imagen no existe, muestra el emoji de respaldo
                      const target = e.currentTarget
                      target.style.display = 'none'
                      target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  <span className="hidden text-6xl">{product.emoji}</span>
                </div>

                {/* Info */}
                <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-2.5 py-1 rounded-full w-fit">
                  {product.category}
                </span>
                <h3 className="font-semibold text-slate-800 mt-2">{product.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-1 leading-snug">{product.model}</p>
                <p className="text-2xl font-bold text-brand-500 mt-1 mb-5">
                  {formatCurrency(product.price)}
                </p>

                {/* Controles de cantidad */}
                <div className="mt-auto">
                  {inCart ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors text-lg"
                        aria-label="Quitar uno"
                      >
                        −
                      </button>
                      <span className="font-bold text-slate-800 w-6 text-center text-lg">
                        {inCart.qty}
                      </span>
                      <button
                        onClick={() => handleAdd(product)}
                        className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold flex items-center justify-center transition-colors text-lg"
                        aria-label="Agregar uno"
                      >
                        +
                      </button>
                      <span className="ml-auto text-sm font-semibold text-slate-500">
                        {formatCurrency(product.price * inCart.qty)}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white py-2.5 rounded-xl font-semibold transition-colors"
                    >
                      Agregar al carrito
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </main>

      {/*  Panel del carrito (sidebar) */}
      {isCartOpen && (
        // [SCOPE] `isCartOpen` viene del scope del componente App
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Panel */}
          <aside className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col">
            {/* Header del carrito */}
            <div className="bg-brand-500 text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl font-bold">Tu Carrito</h2>
                <p className="text-brand-200 text-xs mt-0.5">
                  {totalItems} artículo{totalItems !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-2xl w-9 h-9 flex items-center justify-center rounded-lg hover:bg-brand-600 transition-colors"
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            {/* Lista de items o estado vacío */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
                <span className="text-6xl">🛒</span>
                <p className="text-slate-500 font-medium">Tu carrito está vacío</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-brand-500 hover:text-brand-700 font-semibold text-sm transition-colors"
                >
                  Explorar productos →
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <ul className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100"
                    >
                      {/* Miniatura en el carrito */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-50 flex items-center justify-center shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                        <span className="hidden text-2xl">{item.emoji}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 truncate text-sm">
                          {item.name}
                        </p>
                        <p className="text-brand-500 font-bold text-sm">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 flex items-center justify-center transition-colors"
                          aria-label="Quitar uno"
                        >
                          −
                        </button>
                        <span className="w-5 text-center font-bold text-slate-800 text-sm">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleAdd(item)}
                          className="w-7 h-7 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold flex items-center justify-center transition-colors"
                          aria-label="Agregar uno"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer con total y acciones */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Total</span>
                    <span className="text-2xl font-bold text-slate-800">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  <button className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white py-3 rounded-xl font-bold transition-colors shadow-sm">
                    Proceder al pago →
                  </button>

                  <button
                    onClick={handleClear}
                    className="w-full text-rose-500 hover:text-rose-700 py-1.5 text-sm font-medium transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
