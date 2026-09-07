import Container from '../components/Container.jsx'
import Section from '../components/Section.jsx'
import { SITE } from '../config/site.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <p className="hero__eyebrow">{SITE.tagline}</p>
          <h1 className="hero__title">{SITE.name}</h1>
          <p className="hero__text">
            Este es el esqueleto del sitio. Reemplaza este bloque con el mensaje
            principal de Migo.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contenido">
              Ver más
            </a>
            <a className="btn btn--ghost" href="/contacto">
              Contacto
            </a>
          </div>
        </Container>
      </section>

      <Section
        id="contenido"
        title="Sección de contenido"
        subtitle="Duplica este componente Section para cada bloque que necesites."
      >
        <div className="grid grid--3">
          {[1, 2, 3].map((n) => (
            <article className="card" key={n}>
              <h3 className="card__title">Bloque {n}</h3>
              <p className="card__text">
                Texto de ejemplo. Aquí va el contenido real cuando lo definamos.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}
