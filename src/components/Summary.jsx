import { money } from '../utils'

export default function Summary({ totals }) {
  return (
    <dl className="summary">
      <div><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
      {totals.discount > 0 && (
        <div className="disc"><dt>Discount ({totals.promo})</dt><dd>−{money(totals.discount)}</dd></div>
      )}
      <div><dt>Delivery</dt><dd>{totals.delivery ? money(totals.delivery) : 'Free'}</dd></div>
      <div className="total"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
    </dl>
  )
}
