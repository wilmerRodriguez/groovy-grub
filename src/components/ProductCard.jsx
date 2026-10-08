import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/slices/cartSlice'
import { pushToast } from '../store/slices/uiSlice'
import { money } from '../utils'

export default function ProductCard({ product: p }) {
  const dispatch = useDispatch()
  const add = () => {
    dispatch(addItem({ id: p.id }))
    dispatch(pushToast(`${p.emoji} ${p.name} added to cart`))
  }
  return (
    <article className="card">
      <Link to={`/product/${p.id}`} className="card-art" style={{ '--c': p.color }} aria-label={p.name}>
        <span aria-hidden="true">{p.emoji}</span>
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <span className="pill">{p.category}</span>
          <span className="rating" aria-label={`Rated ${p.rating} out of 5`}>★ {p.rating}</span>
        </div>
        <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        <div className="card-foot">
          <span className="price">{money(p.price)}</span>
          <button className="btn btn-sm" onClick={add}>Add +</button>
        </div>
      </div>
    </article>
  )
}
