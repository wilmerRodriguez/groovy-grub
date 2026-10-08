import { createSlice, createSelector } from '@reduxjs/toolkit'
import { getProduct } from '../../data/products'

export const FREE_DELIVERY_THRESHOLD = 30
export const DELIVERY_FEE = 3.99
export const PROMO_CODES = { GRUB10: 0.1, GROOVY20: 0.2 }

const initialState = { items: {}, promo: null }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload: { id, qty = 1 } }) {
      state.items[id] = Math.min((state.items[id] || 0) + qty, 20)
    },
    setQty(state, { payload: { id, qty } }) {
      if (qty <= 0) delete state.items[id]
      else state.items[id] = Math.min(qty, 20)
    },
    removeItem(state, { payload: id }) {
      delete state.items[id]
    },
    applyPromo(state, { payload: code }) {
      const c = code.trim().toUpperCase()
      state.promo = PROMO_CODES[c] ? c : null
    },
    clearPromo(state) {
      state.promo = null
    },
    clearCart() {
      return initialState
    },
  },
})

export const { addItem, setQty, removeItem, applyPromo, clearPromo, clearCart } = cartSlice.actions
export default cartSlice.reducer

const selectItems = (s) => s.cart.items
const selectPromo = (s) => s.cart.promo

export const selectCartLines = createSelector([selectItems], (items) =>
  Object.entries(items)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((l) => l.product)
)

export const selectCartCount = createSelector([selectItems], (items) =>
  Object.values(items).reduce((n, q) => n + q, 0)
)

export const selectTotals = createSelector([selectCartLines, selectPromo], (lines, promo) => {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const discount = promo ? subtotal * PROMO_CODES[promo] : 0
  const afterDiscount = subtotal - discount
  const delivery = subtotal === 0 || afterDiscount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  return {
    subtotal,
    discount,
    delivery,
    total: afterDiscount + delivery,
    toFreeDelivery: Math.max(0, FREE_DELIVERY_THRESHOLD - afterDiscount),
    promo,
  }
})
