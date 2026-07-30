import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about' },
  { label: 'Pricing',  to: '/pricing' },
  { label: 'Showcase', to: '/showcase' },
  { label: 'Contact',  to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="Cozy K9 Shack logo" className="logo-badge-img" />
          <div className="logo-text">
            <div className="logo-name">COZY K9 SHACK</div>
            <div className="logo-tagline">In-Home Pet Grooming</div>
          </div>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="nav-book">🐾 Book Appointment</Link>
        </nav>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav className={`mobile-nav${open ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((l) => (
          <NavLink key={l.label} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          className="btn btn-blush"
          style={{ marginTop: 12, justifyContent: 'center' }}
          onClick={() => setOpen(false)}
        >
          Book Appointment
        </Link>
      </nav>
    </header>
  )
}

export { navLinks }
