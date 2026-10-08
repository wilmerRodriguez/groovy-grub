import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="wrap empty page-empty">
      <span aria-hidden="true">🌯</span>
      <h1>This page got eaten</h1>
      <p>We couldn't find what you were looking for.</p>
      <Link to="/" className="btn">Back to the menu</Link>
    </div>
  )
}
