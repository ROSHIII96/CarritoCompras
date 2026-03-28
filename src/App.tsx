import { useState } from 'react'
import { PRODUCTS, type Product } from './data/products'
import { cartManager, type CartItem } from './cart/cartManager'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartPanel from './components/CartPanel'

export default function App() {
  // SCOPE Variables de estado con scope de bloque (let interno de useState)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Valores derivados
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar totalItems={totalItems} onOpenCart={() => setIsCartOpen(true)} />

      {/* Catálogo de productos */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Catálogo</h2>
          <p className="text-slate-500 mt-1 text-sm">
            {PRODUCTS.length} productos disponibles
          </p>
        </div>

        {/* SCOPE `product` e `inCart` tienen scope de bloque por
            iteración — cada tarjeta tiene sus propias variables. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={cartItems.find((i) => i.id === product.id)}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </main>

      <CartPanel
        isOpen={isCartOpen}
        cartItems={cartItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClose={() => setIsCartOpen(false)}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </div>
  )
}
