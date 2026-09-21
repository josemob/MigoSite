import { NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import { SITE, LEGAL_LINKS } from '../config/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </p>
        <nav className="footer__legal" aria-label="Enlaces legales">
          {LEGAL_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="footer__link">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
