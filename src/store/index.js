import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice'
import auth from './slices/authSlice'
import ui from './slices/uiSlice'

const KEY = 'groovy-grub:v1'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: { cart, auth, ui },
  preloadedState: loadState(),
})

// Persist cart + session (not toasts) so a refresh keeps your order.
let last
store.subscribe(() => {
  const { cart, auth } = store.getState()
  if (last && last.cart === cart && last.auth === auth) return
  last = { cart, auth }
  try {
    localStorage.setItem(KEY, JSON.stringify({ cart, auth }))
  } catch {
    /* storage unavailable: app still works in memory */
  }
})
