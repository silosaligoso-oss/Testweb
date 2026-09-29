import { useState, useEffect } from 'react'

const REVEAL = '.hero-text > *, .hero-art, .perks-in > div, h2, .sec-head .btn, .cat, .card, .promo, .stats > div, blockquote, .news-in > *, .foot > div, .copy'

function useScrollReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(REVEAL)]
    els.forEach((el) => {
      el.classList.add('reveal')
      const i = [...el.parentElement.children].indexOf(el)
      el.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`)
    })
    const io = new IntersectionObserver(
      (entries) => entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        if (isIntersecting) { target.classList.remove('gone'); target.classList.add('in') }
        else if (boundingClientRect.top < 0) target.classList.add('gone') // left through the top: fade out
        else target.classList.remove('in', 'gone') // still below: wait to pop up
      }),
      { rootMargin: '-10% 0px -6% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const categories = [
  ['Home & Living', '🛋️'], ['Electronics', '🎧'], ['Beauty & Care', '🧴'],
  ['Fitness', '🏋️'], ['Fashion', '👜'], ['Baby & Kids', '🧸'], ['Kitchen', '🍳'],
]
const products = [
  { name: 'Wireless Over-Ear Headphones', img: '🎧', price: 49.99, old: 79.99, rating: 1245, tag: 'BEST SELLER' },
  { name: 'Smart Watch Series X', img: '⌚', price: 39.99, old: 59.99, rating: 1036, tag: 'SAVE 25%' },
  { name: 'Aroma Diffuser Humidifier', img: '🕯️', price: 24.99, old: 39.99, rating: 785, tag: 'NEW' },
  { name: 'Classic Urban Backpack', img: '🎒', price: 44.99, old: 59.99, rating: 950, tag: 'SAVE 30%' },
  { name: 'Makeup Brush Set (12 PCS)', img: '🖌️', price: 19.99, old: 29.99, rating: 645, tag: 'NEW' },
]
const perks = [
  ['🚚', 'Free Shipping', 'On orders over $50'], ['↻', '30 Days Returns', 'No hassle returns'],
  ['🛡️', 'Secure Payment', '100% secure checkout'], ['🎧', '24/7 Support', "We're here to help"],
]
const stats = [['👥', '10K+', 'Happy Customers'], ['☆', '4.8', 'Customer Rating'], ['🛍️', '500+', 'Quality Products'], ['✔', '100%', 'Secure Checkout']]
const reviews = [
  ['Jessica M.', 'Amazing quality and fast shipping! Very happy with my purchase.'],
  ['David R.', 'FAMSWORLD has become my go-to store for everything.'],
  ['Sophia L.', 'Excellent customer service and beautiful products.'],
]
const footerCols = {
  Shop: ['All Products', 'Best Sellers', 'New Arrivals', 'Track Order', 'Deals'],
  'Customer Service': ['Contact Us', 'Shipping Policy', 'Return & Refund Policy', 'FAQ', 'Size Guide'],
  'About Us': ['About FAMSWORLD', 'Our Story', 'Careers', 'Privacy Policy', 'Terms & Conditions'],
}

const Stars = ({ n }) => (
  <div className="stars" aria-label="Rated 4.5 out of 5">★★★★<span>★</span> <small>({n.toLocaleString()})</small></div>
)

export default function App() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState(0)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
useEffect(() => {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}, [dark])
  useScrollReveal()
  const links = ['Home', 'Shop', 'Best Sellers', 'New Arrivals', 'About Us', 'Contact Us']

  return (
    <>
      <div className="topbar">
        <span>🚚 Free Worldwide Shipping on Orders Over $50</span>
        <span>🛡️ 30-Day Money Back Guarantee</span>
        <span>🎧 24/7 Customer Support</span>
      </div>

      <header className="header">
        <div className="wrap nav">
          <a href="#" className="logo"><b>ANI</b>MERCH<small>QUALITY &amp; TRUST</small></a>
          <nav className={open ? 'links open' : 'links'}>
            {links.map((l) => <a key={l} href="#" onClick={() => setOpen(false)}>{l}</a>)}
          </nav>
          <div className="icons">
            <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
            <button aria-label="Search">🔍</button>
            <button aria-label="Account">👤</button>
            <button aria-label="Wishlist" className="hide-sm">♡</button>
            <button aria-label="Cart" className="cart">🛒<i>{cart}</i></button>
            <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-text">
            <span className="pill">WELCOME TO ANIMERCH</span>
            <h1>QUALITY PRODUCTS.<em>TRUSTED BY THOUSANDS.</em></h1>
            <p>Discover a wide range of high-quality products carefully selected for your lifestyle.</p>
            <div className="btns">
              <a href="#best" className="btn">SHOP NOW ›</a>
              <a href="#cats" className="btn ghost">EXPLORE COLLECTION</a>
            </div>
            <ul className="mini">
              {['Premium Quality|Carefully Selected', 'Secure Payments|100% Safe & Secure', 'Easy Returns|Hassle Free Returns', 'Customer Support|24/7 Friendly Support'].map((x) => {
                const [a, b] = x.split('|'); return <li key={a}><strong>{a}</strong><span>{b}</span></li>
              })}
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true"><span><img src="public/jjk.png" alt="" /></span><span><img src="public/eyeshirt.png" alt="" /></span></div>
        </div>
      </section>

      <section className="perks">
        <div className="wrap perks-in">
          {perks.map(([i, t, s]) => <div key={t}><span>{i}</span><p><b>{t}</b><small>{s}</small></p></div>)}
        </div>
      </section>

      <section className="wrap sec" id="cats">
        <h2>SHOP BY <em>CATEGORY</em></h2>
        <div className="cats">
          {categories.map(([n, i]) => (
            <a href="#" key={n} className="cat"><span>{i}</span>{n}</a>
          ))}
        </div>
      </section>

      <section className="wrap sec" id="best">
        <div className="sec-head"><h2>BEST <em>SELLERS</em></h2><a href="#" className="btn ghost sm">VIEW ALL</a></div>
        <div className="grid">
          {products.map((p) => (
            <article className="card" key={p.name}>
              <b className="tag">{p.tag}</b>
              <div className="img">{p.img}</div>
              <h3>{p.name}</h3>
              <Stars n={p.rating} />
              <p className="price">${p.price} <s>${p.old}</s></p>
              <button className="btn block" onClick={() => setCart(cart + 1)}>🛒 ADD TO CART</button>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="promo">
          <div className="gift">🎁</div>
          <div><small>SPECIAL OFFER</small><h2>UP TO <em>40% OFF</em></h2><p>Limited time offer on selected items.</p></div>
          <a href="#best" className="btn">SHOP THE SALE ›</a>
        </div>
      </section>

      <section className="wrap sec">
        <h2>WHY <em>SHOP</em> WITH US?</h2>
        <div className="stats">
          {stats.map(([i, n, l]) => <div key={l}><span>{i}</span><p><b>{n}</b><small>{l}</small></p></div>)}
        </div>
      </section>

      <section className="wrap sec">
        <h2>WHAT OUR <em>CUSTOMERS</em> SAY</h2>
        <div className="reviews">
          {reviews.map(([n, t]) => (
            <blockquote key={n}>
              <div className="stars">★★★★★</div>
              <p>“{t}”</p>
              <footer><span className="avatar">{n[0]}</span><div><b>{n}</b><small>Verified Buyer</small></div></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="news">
        <div className="wrap news-in">
          <div><b>✉ JOIN THE ANIMERCH FAMILY</b><p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p></div>
          {done ? <p className="ok">Thanks for subscribing!</p> : (
            <div className="sub">
              <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
              <button className="btn" onClick={() => email.includes('@') && setDone(true)}>SUBSCRIBE ›</button>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="wrap foot">
          <div className="brand">
            <a href="#" className="logo"><b>ANI</b>MERCH<small>QUALITY &amp; TRUST</small></a>
            <p>ANIMERCH delivers quality products you can trust, at prices you'll love. Your satisfaction is our priority.</p>
            <div className="social">{['f', '◎', 'P', '♪', '▶'].map((s) => <a href="#" key={s} aria-label="Social link">{s}</a>)}</div>
          </div>
          {Object.entries(footerCols).map(([h, ls]) => (
            <div key={h}><h4>{h}</h4>{ls.map((l) => <a href="#" key={l}>{l}</a>)}</div>
          ))}
          <div><h4>We Accept</h4><div className="pay"><span>VISA</span><span>MC</span><span>PayPal</span><span>Pay</span></div></div>
        </div>
        <div className="wrap copy"><span>© 2025 ANIMERCH. All Rights Reserved.</span><span>USD $</span></div>
      </footer>
    </>
  )
}
