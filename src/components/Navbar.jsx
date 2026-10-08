import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/slices/cartSlice'
import { selectUser } from '../store/slices/authSlice'

export default function Navbar() {
  const count = useSelector(selectCartCount)
  const user = useSelector(selectUser)
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="logo" aria-label="Groovy Grub home">
          <span className="logo-mark" aria-hidden="true">🌮</span>
          Groovy<span>Grub</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end className="nav-menu">Menu</NavLink>
          <NavLink to="/account">{user ? `Hi, ${user.name}` : 'Sign in'}</NavLink>
          <NavLink to="/cart" className="cart-btn" aria-label={`Cart, ${count} items`}>
            🛒 <span>Cart</span>
            {count > 0 && <b className="badge">{count}</b>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
