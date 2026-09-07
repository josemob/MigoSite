import Container from './Container.jsx'

export default function Section({ id, title, subtitle, children }) {
  return (
    <section className="section" id={id}>
      <Container>
        {(title || subtitle) && (
          <header className="section__head">
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
