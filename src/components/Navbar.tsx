interface NavbarProps {
  totalItems: number
  onOpenCart: () => void
}

export default function Navbar({ totalItems, onOpenCart }: NavbarProps) {
  return (
    <header className="bg-brand-500 text-white px-6 py-4 sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛍️</span>
          <h1 className="text-xl font-bold tracking-tight">TechShop</h1>
        </div>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <span>🛒</span>
          <span>Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
