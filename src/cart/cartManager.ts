import { type Product } from '../data/products'

export interface CartItem extends Product {
  qty: number
}

//
// CLOSURE createCartManager devuelve métodos que "cierran sobre"
// la variable `items`. Es inaccesible desde fuera: nadie puede
// hacer cartManager.items — solo puede interactuar a través de
// los métodos retornados.
//
// SCOPE `items` vive en el scope de la función createCartManager.
// Cada llamada a createCartManager() crea un scope independiente,
// por eso un segundo carrito tendría su propio `items` separado.

function createCartManager() {
  // SCOPE Variable privada — solo existe dentro de este scope
  // CLOSURE Los métodos retornados "recuerdan" este items
  let items: CartItem[] = []

  return {
    add(product: Product): CartItem[] {
      // CLOSURE Accedemos a items del scope exterior 
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
      // CLOSURE Mutamos items privado y devolvemos copia
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
export const cartManager = createCartManager()
