import { type Product } from '../data/products'
import { type CartItem } from '../cart/cartManager'
import { formatCurrency } from '../utils/currency'

interface ProductCardProps {
  product: Product
  inCart: CartItem | undefined
  onAdd: (product: Product) => void
  onRemove: (id: number) => void
}

export default function ProductCard({ product, inCart, onAdd, onRemove }: ProductCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
      {/* Imagen del producto — con emoji como fallback */}
      <div className="hover:scale-110 rounded-xl overflow-hidden mb-4 bg-brand-50 h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
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
              onClick={() => onRemove(product.id)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors text-lg"
              aria-label="Quitar uno"
            >
              −
            </button>
            <span className="font-bold text-slate-800 w-6 text-center text-lg">
              {inCart.qty}
            </span>
            <button
              onClick={() => onAdd(product)}
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
            onClick={() => onAdd(product)}
            className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white py-2.5 rounded-xl font-semibold transition-colors"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  )
}
