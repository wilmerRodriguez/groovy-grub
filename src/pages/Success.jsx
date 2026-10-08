import { Link, Navigate, useLocation } from 'react-router-dom'
import { money } from '../utils'

export default function Success() {
  const { state: order } = useLocation()
  if (!order) return <Navigate to="/" replace />
  return (
    <div className="wrap success">
      <div className="success-art" aria-hidden="true">🎉</div>
      <h1>Thanks, {order.name}!</h1>
      <p>Order <b>{order.number}</b> is in the kitchen: {order.items} {order.items === 1 ? 'item' : 'items'}, {money(order.total)}.</p>
      <ol className="steps">
        <li className="done">Order received</li>
        <li className="now">Cooking</li>
        <li>On the way</li>
        <li>Delivered</li>
      </ol>
      <p className="note">Estimated delivery: 25–35 min (it's a demo, so maybe grab a real snack 😄)</p>
      <Link to="/" className="btn">Back to the menu</Link>
    </div>
  )
}
