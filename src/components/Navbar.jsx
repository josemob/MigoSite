import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Container from './Container.jsx'
import { NAV_LINKS, SITE } from '../config/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          {SITE.name}
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  )
}
