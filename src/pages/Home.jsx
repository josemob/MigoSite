import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_LINKS, STORE } from '../config/site.js'
import '../styles/home.css'

const STEPS = [
  {
    n: 1,
    title: 'Cuéntanos qué pasa',
    text: 'La IA de Migo escucha los síntomas de tu mascota, te da primeros auxilios y calcula qué tan urgente es.',
    img: '/pasos/paso-1-cuentanos.jpg',
    alt: 'Dueña describiendo los síntomas de su cachorro en la app Migo',
  },
  {
    n: 2,
    title: 'Te conectamos',
    text: 'Con clínicas 24/7 y veterinarios verificados cerca de ti. En una urgencia, activamos la alerta al instante.',
    img: '/pasos/paso-2-conectamos.jpg',
    alt: 'Veterinaria atendiendo una teleconsulta desde su clínica',
  },
  {
    n: 3,
    title: 'Todo queda guardado',
    text: 'Vacunas, consultas e historia médica viven en un solo expediente que llevas siempre en el bolsillo.',
    img: '/pasos/paso-3-guardado.jpg',
    alt: 'Expediente médico de la mascota dentro de la app Migo',
  },
]

const SERVICIOS = [
  {
    id: 'emergencias',
    title: 'Emergencias 24/7',
    text: 'Botón de urgencia, triaje con IA y ruteo a la clínica abierta más cercana.',
    img: '/servicios/01-emergencias.jpg',
    alt: 'Dueño llegando de urgencia a una clínica veterinaria con su perro',
  },
  {
    id: 'teleconsulta',
    title: 'Teleconsulta',
    text: 'Video con veterinarios verificados y récipe digital, sin salir de casa.',
    img: '/servicios/02-teleconsulta.jpg',
    alt: 'Señora en videoconsulta veterinaria con su gato al lado',
  },
  {
    id: 'agenda',
    title: 'Agenda de citas',
    text: 'Reserva en clínicas aliadas con recordatorios automáticos.',
    img: '/servicios/03-agenda.jpg',
    alt: 'Cita veterinaria agendada desde el teléfono',
  },
  {
    id: 'expediente',
    title: 'Expediente y cartilla',
    text: 'Historial, vacunas y récipes de tu mascota, centralizados y siempre a mano.',
    img: '/servicios/04-expediente.jpg',
    alt: 'Cartilla de vacunación digital de una mascota',
  },
  {
    id: 'aliados',
    title: 'Peluquería y aliados',
    text: 'Grooming y comercios de confianza cerca de ti, dentro de la misma app.',
    img: '/servicios/05-peluqueria.jpg',
    alt: 'Perro recién bañado en una peluquería canina',
  },
]

const AI_CHIPS = ['Detecta urgencias', 'Conoce a tu mascota', 'Agenda por ti']

// Lo que Migo le da al otro lado del mostrador. Nada de esto es promesa:
// es lo que ya trae el panel web para clínicas y el app del veterinario.
const PRO_FEATURES = [
  {
    title: 'Alertas de urgencia en tiempo real',
    text: 'Cuando alguien cerca activa una emergencia, tu clínica la ve con la ubicación, el motivo y el tiempo de llegada.',
  },
  {
    title: 'Agenda y pacientes en un panel',
    text: 'Citas, historias clínicas y récipes en un panel web pensado para el día a día de la consulta.',
  },
  {
    title: 'Te encuentran quienes te necesitan',
    text: 'Tu ficha aparece en el directorio con horarios, servicios y la distancia real a cada dueño.',
  },
]

export default function Home() {
  const [navHidden, setNavHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  // La landing es clara siempre; el <body> hereda el token de tokens.css, que
  // en modo oscuro es casi negro y asoma al hacer overscroll bajo el pie.
  useEffect(() => {
    const previo = document.body.style.background
    document.body.style.background = '#fff'
    return () => {
      document.body.style.background = previo
    }
  }, [])

  // Con el menú móvil abierto se bloquea el scroll del fondo.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const cerrar = () => setMenuOpen(false)

  return (
    <div className="mgo">
      {/* ---------- NAVBAR sticky ---------- */}
      <div className={`mgo-nav-bar ${navHidden && !menuOpen ? 'is-hidden' : ''}`}>
        <div className="mgo__wrap">
          <nav className="mgo-nav" aria-label="Principal">
            <a href="#top" className="mgo-nav__home" onClick={cerrar}>
              <img className="mgo-nav__logo" src="/img/migo-logo.svg" alt="Migo" />
            </a>
            <div className="mgo-nav__links">
              <a className="mgo-nav__link" href="#como-funciona">
                Cómo funciona
              </a>
              <a className="mgo-nav__link" href="#servicios">
                Servicios
              </a>
              <a className="mgo-nav__link" href="#clinicas">
                Para clínicas
              </a>
              <a className="mgo-nav__link" href="#unete">
                Únete
              </a>
            </div>
            <a className="mgo-nav__cta" href="#unete">
              Crear cuenta
            </a>
            <button
              type="button"
              className="mgo-nav__toggle"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`mgo-burger ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          </nav>

          {/* Panel desplegable (solo móvil) */}
          {menuOpen && (
            <div className="mgo-nav__panel">
              <a href="#como-funciona" onClick={cerrar}>
                Cómo funciona
              </a>
              <a href="#servicios" onClick={cerrar}>
                Servicios
              </a>
              <a href="#ia" onClick={cerrar}>
                Migo IA
              </a>
              <a href="#clinicas" onClick={cerrar}>
                Para clínicas
              </a>
              <a className="mgo-nav__panel-cta" href="#unete" onClick={cerrar}>
                Crear cuenta
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ---------- HERO ---------- */}
      <header className="mgo-hero" id="top">
        <img className="mgo-hero__photo" src="/img/hero.png" alt="" aria-hidden="true" />
        <div className="mgo__wrap">
          <div className="mgo-hero__content">
            <h1 className="mgo-hero__title">Cuida a quien te cuida</h1>
            <p className="mgo-hero__text">
              La salud de tu mascota, a un toque de distancia. Emergencias 24/7,
              teleconsulta y su expediente médico, siempre contigo.
            </p>
            <div className="mgo-hero__actions">
              {STORE.android ? (
                <a
                  className="mgo-btn mgo-btn--amarillo"
                  href={STORE.android}
                  target="_blank"
                  rel="noreferrer"
                >
                  Descargar para Android
                </a>
              ) : (
                <span className="mgo-hero__soon">Muy pronto en Google Play</span>
              )}
              <a className="mgo-btn mgo-btn--ghost" href="#como-funciona">
                Ver cómo funciona
              </a>
            </div>
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
            <img
              className="mgo-why__img"
              src="/img/amigo-1.jpg"
              alt="Perro mirando a cámara con la cabeza ladeada"
              loading="lazy"
            />
          </div>
          <div className="mgo-why__col">
            <img
              className="mgo-why__img"
              src="/img/amigo-2.jpg"
              alt="Dueña buscando ayuda en su teléfono de madrugada con su perro"
              loading="lazy"
            />
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
                <img className="mgo-step__img" src={s.img} alt={s.alt} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SERVICIOS ---------- */}
      <section className="mgo-serv" id="servicios">
        <div className="mgo__wrap">
          <div className="mgo-serv__head">
            <h2 className="mgo-serv__title">Todo lo que Migo hace por ustedes</h2>
            <p className="mgo-serv__sub">
              Una sola app para la urgencia, el control de rutina y el día a día
              de tu mascota.
            </p>
          </div>
          <div className="mgo-serv__grid">
            {SERVICIOS.map((s) => (
              <article className="mgo-serv__card" key={s.id}>
                <img
                  className="mgo-serv__img"
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                />
                <div className="mgo-serv__body">
                  <h3 className="mgo-serv__name">{s.title}</h3>
                  <p className="mgo-serv__text">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VETERINARIO EN TU BOLSILLO ---------- */}
      <section className="mgo-ai" id="ia">
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
            <p className="mgo-ai__nota">
              Migo IA orienta y prioriza; no sustituye el diagnóstico de un
              veterinario.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PARA CLÍNICAS Y VETERINARIOS ---------- */}
      <section className="mgo-pro" id="clinicas">
        <div className="mgo__wrap mgo-pro__grid">
          <div className="mgo-pro__intro">
            <p className="mgo-pro__eyebrow">PARA CLÍNICAS Y VETERINARIOS</p>
            <h2 className="mgo-pro__title">
              Del otro lado del mostrador también hay un Migo
            </h2>
            <p className="mgo-pro__text">
              Estamos sumando las primeras clínicas, veterinarios independientes y
              comercios aliados en Venezuela. Afiliarte es gratis mientras armamos
              la red.
            </p>
            <Link className="mgo-btn mgo-btn--morado" to="/contacto">
              Quiero afiliar mi negocio
            </Link>
          </div>
          <ul className="mgo-pro__list">
            {PRO_FEATURES.map((f) => (
              <li className="mgo-pro__item" key={f.title}>
                <h3 className="mgo-pro__item-title">{f.title}</h3>
                <p className="mgo-pro__item-text">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- ÚNETE / REGISTRO ---------- */}
      <section className="mgo-cta" id="unete">
        <div className="mgo__wrap">
          <p className="mgo-cta__eyebrow">ÚNETE A LA MANADA MIGO</p>
          <h2 className="mgo-cta__title">Cuida, conecta y crece con Migo</h2>
          <p className="mgo-cta__text">
            Crea tu cuenta gratis y ten a tu mascota más protegida. ¿Eres clínica,
            veterinario o comercio? Afíliate y haz crecer tu práctica.
          </p>
          <div className="mgo-cta__actions">
            {STORE.android ? (
              <a
                className="mgo-btn mgo-btn--amarillo"
                href={STORE.android}
                target="_blank"
                rel="noreferrer"
              >
                Descargar Migo gratis
              </a>
            ) : (
              <span className="mgo-btn mgo-btn--amarillo is-soon" aria-disabled="true">
                Muy pronto en Google Play
              </span>
            )}
            <Link className="mgo-btn mgo-btn--ghost" to="/contacto">
              Afiliar mi negocio
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER (añadido; el frame no lo incluye) ---------- */}
      <footer className="mgo-footer">
        <div className="mgo__wrap">
          <div className="mgo-footer__top">
            <div className="mgo-footer__brand-col">
              <img className="mgo-footer__logo" src="/img/migo-logo.svg" alt="Migo" />
              <p className="mgo-footer__claim">Cuida a quien te cuida</p>
            </div>
            <nav className="mgo-footer__nav" aria-label="Secciones">
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#servicios">Servicios</a>
              <a href="#clinicas">Para clínicas</a>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/contacto">Contacto</Link>
            </nav>
            <nav className="mgo-footer__nav" aria-label="Legal">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mgo-footer__bottom">
            <p className="mgo-footer__copy">
              © {new Date().getFullYear()} Migo · Cuida a quien te cuida
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
