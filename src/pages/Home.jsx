import { useEffect, useState } from 'react'
import '../styles/home.css'

const STEPS = [
  {
    n: 1,
    title: 'Cuéntanos qué pasa',
    text: 'La IA de Migo escucha los síntomas de tu mascota, te da primeros auxilios y calcula qué tan urgente es.',
  },
  {
    n: 2,
    title: 'Te conectamos',
    text: 'Con clínicas 24/7 y veterinarios verificados cerca de ti. En una urgencia, activamos la alerta al instante.',
  },
  {
    n: 3,
    title: 'Todo queda guardado',
    text: 'Vacunas, consultas e historia médica viven en un solo expediente que llevas siempre en el bolsillo.',
  },
]

const AI_CHIPS = ['Detecta urgencias', 'Conoce a tu mascota', 'Agenda por ti']

export default function Home() {
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      // Baja: ocultar (a partir de 120px). Sube: mostrar.
      if (y > last && y > 120) setNavHidden(true)
      else if (y < last) setNavHidden(false)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="mgo">
      {/* ---------- NAVBAR sticky ---------- */}
      <div className={`mgo-nav-bar ${navHidden ? 'is-hidden' : ''}`}>
        <div className="mgo__wrap">
          <nav className="mgo-nav" aria-label="Principal">
            <img className="mgo-nav__logo" src="/img/migo-logo.svg" alt="Migo" />
            <div className="mgo-nav__links">
              <a className="mgo-nav__link is-current" href="#como-funciona">
                Cómo funciona
              </a>
              <a className="mgo-nav__link" href="#que-hace">
                Qué hace
              </a>
              <a className="mgo-nav__link" href="#unete">
                Únete
              </a>
            </div>
            <a className="mgo-nav__cta" href="#unete">
              Crear cuenta
            </a>
          </nav>
        </div>
      </div>

      {/* ---------- HERO ---------- */}
      <header className="mgo-hero">
        <img className="mgo-hero__photo" src="/img/hero.png" alt="" aria-hidden="true" />
        <div className="mgo__wrap">
          <div className="mgo-hero__content">
            <h1 className="mgo-hero__title">Cuida a quien te cuida</h1>
            <p className="mgo-hero__text">
              La salud de tu mascota, a un toque de distancia. Emergencias 24/7,
              teleconsulta y su expediente médico, siempre contigo.
            </p>
          </div>
        </div>
      </header>

      {/* ---------- TU MEJOR AMIGO ---------- */}
      <section className="mgo-why" id="que-hace">
        <div className="mgo__wrap mgo-why__grid">
          <div className="mgo-why__col">
            <div className="mgo-why__head">
              <h2 className="mgo-why__title">Tu mejor amigo no está bien.</h2>
              <p className="mgo-why__sub">¿A dónde vas?</p>
            </div>
            <div className="mgo-ph mgo-ph--440">Foto de mascota</div>
          </div>
          <div className="mgo-why__col">
            <div className="mgo-ph mgo-ph--440">Foto de mascota</div>
            <p className="mgo-why__text">
              Ese nudo en el estómago, esa carrera contra el reloj sin saber qué
              clínica está abierta ni a quién llamar. Migo existe justo para ese
              momento, para que nunca lo enfrentes solo.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- TRES PASOS ---------- */}
      <section className="mgo-steps" id="como-funciona">
        <div className="mgo__wrap">
          <div className="mgo-steps__head">
            <h2 className="mgo-steps__title">
              De la angustia a la calma en tres pasos
            </h2>
            <p className="mgo-steps__sub">
              Sin llamadas a ciegas ni salas de espera eternas. Migo te acompaña
              desde el primer síntoma.
            </p>
          </div>
          <div className="mgo-steps__grid">
            {STEPS.map((s) => (
              <article className="mgo-step" key={s.n}>
                <div className="mgo-step__body">
                  <span className="mgo-step__num">{s.n}</span>
                  <div>
                    <h3 className="mgo-step__title">{s.title}</h3>
                    <p className="mgo-step__text">{s.text}</p>
                  </div>
                </div>
                <div className="mgo-ph">Ilustración</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VETERINARIO EN TU BOLSILLO ---------- */}
      <section className="mgo-ai" id="unete">
        <img className="mgo-ai__bubbles" src="/img/bubbles.svg" alt="" aria-hidden="true" />
        <div className="mgo__wrap">
          <div className="mgo-ai__content">
            <div>
              <h2 className="mgo-ai__title">
                Un veterinario en tu bolsillo, a cualquier hora
              </h2>
              <p className="mgo-ai__text">
                Cuéntale a Migo qué le pasa a tu mascota y recibe orientación clara
                al instante. Conoce su edad, raza y alergias, y si es una
                emergencia, te lo dice y activa la ayuda.
              </p>
            </div>
            <div className="mgo-ai__chips">
              {AI_CHIPS.map((c) => (
                <span className="mgo-chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER (añadido; el frame no lo incluye) ---------- */}
      <footer className="mgo-footer">
        <div className="mgo__wrap mgo-footer__inner">
          <span className="mgo-footer__brand">migo</span>
          <p className="mgo-footer__copy">
            © {new Date().getFullYear()} Migo · Cuida a quien te cuida
          </p>
        </div>
      </footer>
    </div>
  )
}
