import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item) => {
        const existing = get().cart.find((i) => i.id === item.id)
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            ),
          })
        } else {
          set({ cart: [...get().cart, item] })
        }
      },
      removeItem: (id) => {
        set({ cart: get().cart.filter((i) => i.id !== id) })
      },
      updateQty: (id, qty) => {
        if (qty < 1) return
        set({
          cart: get().cart.map((i) => (i.id === id ? { ...i, qty } : i)),
        })
      },
      clearCart: () => set({ cart: [] }),
      getTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.qty, 0)
      },
    }),
    {
      name: 'evseren-cart-storage',
    }
  )
)
