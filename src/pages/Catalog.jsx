import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

const SORTS = {
  popular: (a, b) => b.reviews - a.reviews,
  rating: (a, b) => b.rating - a.rating,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

export default function Catalog() {
  // Filters live in the URL so results are shareable and survive refresh
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || 'All'
  const sort = params.get('sort') || 'popular'

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return products
      .filter((p) => cat === 'All' || p.category === cat)
      .filter((p) =>
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.includes(needle)) ||
        p.description.toLowerCase().includes(needle)
      )
      .sort(SORTS[sort] || SORTS.popular)
  }, [q, cat, sort])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow">Fresh · Fast · Funky</p>
            <h1>Food that <em>slaps</em>,<br />delivered hot.</h1>
            <p className="lede">Bowls, snacks, drinks and sweets made to order. Free delivery over €30. Try code <code>GRUB10</code> for 10% off.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span>🌮</span><span>🍜</span><span>🥭</span><span>🍩</span>
          </div>
        </div>
      </section>

      <section className="wrap catalog">
        <div className="toolbar">
          <label className="search">
            <span className="sr">Search the menu</span>
            <input
              type="search"
              placeholder="Search tacos, vegan, spicy…"
              value={q}
              onChange={(e) => update('q', e.target.value, '')}
            />
          </label>
          <div className="chips" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip ${c === cat ? 'on' : ''}`}
                aria-pressed={c === cat}
                onClick={() => update('cat', c, 'All')}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="sort">
            <span className="sr">Sort by</span>
            <select value={sort} onChange={(e) => update('sort', e.target.value, 'popular')}>
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <p className="count" aria-live="polite">{results.length} {results.length === 1 ? 'item' : 'items'}</p>

        {results.length ? (
          <div className="grid">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty">
            <span aria-hidden="true">🫠</span>
            <p>Nothing matches “{q}”. Try another word or category.</p>
            <button className="btn btn-ghost" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
          </div>
        )}
      </section>
    </>
  )
}
