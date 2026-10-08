import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartLines, selectTotals, clearCart } from '../store/slices/cartSlice'
import { selectUser } from '../store/slices/authSlice'
import Summary from '../components/Summary'
import { money } from '../utils'

const PAYMENTS = [
  { id: 'card', label: '💳 Card' },
  { id: 'paypal', label: '🅿️ PayPal' },
  { id: 'cash', label: '💶 Cash on delivery' },
]

const validators = {
  name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email.',
  address: (v) => v.trim().length >= 5 || 'Please enter a delivery address.',
  city: (v) => v.trim().length >= 2 || 'Please enter your city.',
  zip: (v) => /^\d{4,6}$/.test(v.trim()) || 'Postcode should be 4–6 digits.',
}

export default function Checkout() {
  const lines = useSelector(selectCartLines)
  const totals = useSelector(selectTotals)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', address: '', city: '', zip: '', notes: '' })
  const [payment, setPayment] = useState('card')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  if (!lines.length && !placing) return <Navigate to="/cart" replace />

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    for (const [k, check] of Object.entries(validators)) {
      const r = check(form[k])
      if (r !== true) next[k] = r
    }
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) return document.getElementById(`f-${first}`)?.focus()

    setPlacing(true)
    const order = {
      number: `GG-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      name: form.name.split(' ')[0],
      total: totals.total,
      items: lines.reduce((n, l) => n + l.qty, 0),
      payment,
    }
    // Simulated network delay for a realistic "placing order" state
    setTimeout(() => {
      dispatch(clearCart())
      navigate('/success', { replace: true, state: order })
    }, 900)
  }

  const field = (k, label, props = {}) => (
    <div className={`field ${errors[k] ? 'has-err' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
      {errors[k] && <span className="err" id={`e-${k}`}>{errors[k]}</span>}
    </div>
  )

  return (
    <div className="wrap checkout">
      <Link to="/cart" className="back">← Back to cart</Link>
      <h1>Checkout</h1>
      <form className="checkout-in" onSubmit={submit} noValidate>
        <div>
          <fieldset>
            <legend>Delivery details</legend>
            <div className="row">{field('name', 'Full name', { autoComplete: 'name' })}{field('email', 'Email', { type: 'email', autoComplete: 'email' })}</div>
            {field('address', 'Address', { autoComplete: 'street-address' })}
            <div className="row">{field('city', 'City', { autoComplete: 'address-level2' })}{field('zip', 'Postcode', { inputMode: 'numeric', autoComplete: 'postal-code' })}</div>
            <div className="field">
              <label htmlFor="f-notes">Notes for the rider (optional)</label>
              <textarea id="f-notes" rows={2} value={form.notes} onChange={set('notes')} placeholder="Door code, floor, extra napkins…" />
            </div>
          </fieldset>
          <fieldset>
            <legend>Payment</legend>
            <div className="pay">
              {PAYMENTS.map((p) => (
                <label key={p.id} className={`pay-opt ${payment === p.id ? 'on' : ''}`}>
                  <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} />
                  {p.label}
                </label>
              ))}
            </div>
            <p className="note">Demo store: no payment is taken.</p>
          </fieldset>
        </div>
        <aside>
          <h2>Order summary</h2>
          <ul className="mini">
            {lines.map(({ product: p, qty }) => (
              <li key={p.id}><span>{p.emoji} {qty} × {p.name}</span><span>{money(p.price * qty)}</span></li>
            ))}
          </ul>
          <Summary totals={totals} />
          <button className="btn btn-block" type="submit" disabled={placing}>
            {placing ? 'Placing order…' : `Place order · ${money(totals.total)}`}
          </button>
        </aside>
      </form>
    </div>
  )
}
