import Container from './Container.jsx'
import { SITE } from '../config/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}
