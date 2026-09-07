import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'

export default function NotFound() {
  return (
    <Section title="404" subtitle="Esta página no existe.">
      <Link className="btn btn--primary" to="/">
        Volver al inicio
      </Link>
    </Section>
  )
}
