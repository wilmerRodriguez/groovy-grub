import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProduct, products } from '../data/products'
import { addItem } from '../store/slices/cartSlice'
import { pushToast } from '../store/slices/uiSlice'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'
import { money } from '../utils'

export default function ProductDetail() {
  const { id } = useParams()
  const p = getProduct(id)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  if (!p) return <NotFound />

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3)
  const add = () => {
    dispatch(addItem({ id: p.id, qty }))
    dispatch(pushToast(`${p.emoji} ${qty} × ${p.name} added`))
    setQty(1)
  }

  return (
    <div className="wrap detail">
      <Link to="/" className="back">← Back to menu</Link>
      <div className="detail-in">
        <div className="detail-art" style={{ '--c': p.color }} aria-hidden="true">{p.emoji}</div>
        <div>
          <span className="pill">{p.category}</span>
          <h1>{p.name}</h1>
          <p className="rating big">★ {p.rating} <span>({p.reviews} reviews)</span></p>
          <p className="desc">{p.description}</p>
          <ul className="tags">{p.tags.map((t) => <li key={t}>#{t}</li>)}</ul>
          <div className="buy">
            <span className="price big">{money(p.price)}</span>
            <div className="qty" role="group" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <output aria-live="polite">{qty}</output>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn" onClick={add}>Add to cart · {money(p.price * qty)}</button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related">
          <h2>You might also dig</h2>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
        </section>
      )}
    </div>
  )
}
