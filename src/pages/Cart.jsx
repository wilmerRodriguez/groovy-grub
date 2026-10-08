import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartLines, selectTotals, setQty, removeItem, applyPromo, clearPromo, FREE_DELIVERY_THRESHOLD,
} from '../store/slices/cartSlice'
import { pushToast } from '../store/slices/uiSlice'
import { money } from '../utils'
import Summary from '../components/Summary'

export default function Cart() {
  const lines = useSelector(selectCartLines)
  const totals = useSelector(selectTotals)
  const dispatch = useDispatch()
  const [code, setCode] = useState('')

  if (!lines.length) {
    return (
      <div className="wrap empty page-empty">
        <span aria-hidden="true">🛒</span>
        <h1>Your cart is empty</h1>
        <p>Let's fix that.</p>
        <Link to="/" className="btn">Browse the menu</Link>
      </div>
    )
  }

  const submitPromo = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    dispatch(applyPromo(code))
    const ok = ['GRUB10', 'GROOVY20'].includes(code.trim().toUpperCase())
    dispatch(pushToast(ok ? `Code ${code.toUpperCase()} applied 🎉` : `“${code}” isn't a valid code`, ok ? 'ok' : 'err'))
    setCode('')
  }

  const pct = Math.min(100, ((FREE_DELIVERY_THRESHOLD - totals.toFreeDelivery) / FREE_DELIVERY_THRESHOLD) * 100)

  return (
    <div className="wrap cart">
      <h1>Your cart</h1>
      <div className="cart-in">
        <div>
          <div className="ship" aria-live="polite">
            <p>{totals.toFreeDelivery > 0
              ? <>Add <b>{money(totals.toFreeDelivery)}</b> more for free delivery 🚲</>
              : <>You've unlocked <b>free delivery</b> 🎉</>}
            </p>
            <div className="bar"><span style={{ width: `${pct}%` }} /></div>
          </div>
          <ul className="lines">
            {lines.map(({ product: p, qty }) => (
              <li key={p.id} className="line">
                <Link to={`/product/${p.id}`} className="line-art" style={{ '--c': p.color }} aria-hidden="true" tabIndex={-1}>{p.emoji}</Link>
                <div className="line-info">
                  <Link to={`/product/${p.id}`}><b>{p.name}</b></Link>
                  <span>{money(p.price)} each</span>
                </div>
                <div className="qty small" role="group" aria-label={`Quantity of ${p.name}`}>
                  <button onClick={() => dispatch(setQty({ id: p.id, qty: qty - 1 }))} aria-label="Decrease">−</button>
                  <output>{qty}</output>
                  <button onClick={() => dispatch(setQty({ id: p.id, qty: qty + 1 }))} aria-label="Increase">+</button>
                </div>
                <b className="line-total">{money(p.price * qty)}</b>
                <button className="remove" onClick={() => dispatch(removeItem(p.id))} aria-label={`Remove ${p.name}`}>✕</button>
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <Summary totals={totals} />
          <form className="promo" onSubmit={submitPromo}>
            <label htmlFor="promo">Promo code</label>
            <div>
              <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="GRUB10" />
              <button className="btn btn-ghost btn-sm" type="submit">Apply</button>
            </div>
            {totals.promo && (
              <p className="applied">
                {totals.promo} active <button type="button" onClick={() => dispatch(clearPromo())}>remove</button>
              </p>
            )}
          </form>
          <Link to="/checkout" className="btn btn-block">Checkout →</Link>
        </aside>
      </div>
    </div>
  )
}
