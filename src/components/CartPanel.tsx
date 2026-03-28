import { type CartItem } from '../cart/cartManager'
import { type Product } from '../data/products'
import { formatCurrency } from '../utils/currency'

interface CartPanelProps {
  isOpen: boolean
  cartItems: CartItem[]
  totalItems: number
  totalPrice: number
  onClose: () => void
  onAdd: (product: Product) => void
  onRemove: (id: number) => void
  onClear: () => void
}

export default function CartPanel({
  isOpen,
  cartItems,
  totalItems,
  totalPrice,
  onClose,
  onAdd,
  onRemove,
  onClear,
}: CartPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
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
            onClick={onClose}
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
              onClick={onClose}
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
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 flex items-center justify-center transition-colors"
                      aria-label="Quitar uno"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-bold text-slate-800 text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onAdd(item)}
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
                onClick={onClear}
                className="w-full text-rose-500 hover:text-rose-700 py-1.5 text-sm font-medium transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
