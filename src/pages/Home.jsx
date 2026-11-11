import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { STORE } from '../config/site.js'
import '../styles/landing.css'

// Landing de Migo (migopet.app). Adaptación a React del diseño "Migo Landing".
// Animaciones (las mismas del diseño, en un solo requestAnimationFrame):
//  - menú que se oculta al bajar, se vuelve sólido y marca la sección activa
//  - teléfono del hero que sube y se desvanece con el scroll
//  - teléfono flotante y rastro de huellas en "Qué es Migo"
//  - carrusel continuo de funciones (frena al pasar el ratón)
//  - urgencia paso a paso con la columna fija que resalta el paso visible
//  - columnas de servicios con parallax a distintas velocidades
// Todo se apaga con prefers-reduced-motion.

const IMG = '/landing'
const PLAY = STORE.android || '#registro'
const PLAY_LIVE = Boolean(STORE.android)
const VET_URL = STORE.vetAndroid || '#pro'
const PANEL_URL = 'https://migo-vet.vercel.app'

const FEATURES = [
  { big: 'Agenda', sub: 'con vets cerca de ti', title: 'Agenda tu cita', copy: 'Eliges día y hora, la clínica confirma.', cta: 'Agendar',
    img: `${IMG}/app-citas.png`, phone: true },
  { big: '24/7', sub: 'a cualquier hora', title: 'Alerta roja 24/7', copy: 'Avisa a clínicas y vets cerca de ti.', cta: 'Generar alerta',
    img: `${IMG}/app-home.png`, phone: true },
  { big: 'IA', sub: 'tu orientación al instante', title: 'Migo IA', copy: 'Te orienta en segundos.', cta: 'Preguntar a Migo IA',
    img: `${IMG}/app-directorio.png`, phone: true },
  { big: 'QR', sub: 'en su collar', title: 'Expediente + placa QR', copy: 'Sus vacunas a la mano; si se pierde, te avisan.', cta: 'Crear su expediente',
    img: `${IMG}/collar-migo.png`, phone: false },
]

const URG = [
  { n: '01', t: 'Pides ayuda', c: 'Tocas el botón de urgencia y describes qué le pasa a tu mascota.', img: `${IMG}/urgencia/01.jpg` },
  { n: '02', t: 'Migo IA te orienta', c: 'Clasifica la gravedad en segundos y te da primeros auxilios mientras llega la ayuda.', img: `${IMG}/urgencia/02.jpg` },
  { n: '03', t: 'Avisamos cerca de ti', c: 'El aviso llega a las clínicas y vets de guardia en tu zona, con la distancia.', img: `${IMG}/urgencia/03.jpg` },
  { n: '04', t: 'Te atienden', c: 'Atiende el primero que acepta, y la consulta queda guardada en su expediente.', img: `${IMG}/urgencia/04.jpg` },
]

const SVC_COL1 = [
  { label: 'Consulta general', ratio: '4 / 5', bg: '#EEDFF5', tag: 'purple', img: `${IMG}/servicios/consulta-general.jpg` },
  { label: 'Peluquería', ratio: '1 / 1', bg: '#F5EBFA', tag: 'yellow', img: `${IMG}/servicios/peluqueria.jpg` },
  { label: 'Vacunación', ratio: '3 / 4', bg: '#E7D6EE', tag: 'purple', img: `${IMG}/servicios/vacunacion.jpg` },
  { label: 'Spa', ratio: '4 / 5', bg: '#EEDFF5', tag: 'yellow', img: `${IMG}/servicios/spa.jpg` },
  { label: 'Urgencias 24 h', ratio: '1 / 1', bg: '#F5EBFA', tag: 'purple', img: `${IMG}/servicios/urgencias.jpg` },
]
const SVC_COL2 = [
  { label: 'Baño', ratio: '3 / 4', bg: '#F5EBFA', tag: 'yellow', img: `${IMG}/servicios/bano.jpg` },
  { label: 'Videoconsulta', ratio: '1 / 1', bg: '#E7D6EE', tag: 'purple', img: `${IMG}/servicios/videoconsulta.jpg` },
  { label: 'Corte de uñas', ratio: '4 / 5', bg: '#EEDFF5', tag: 'yellow', img: `${IMG}/servicios/corte-unas.jpg` },
  { label: 'Desparasitación', ratio: '3 / 4', bg: '#F5EBFA', tag: 'purple', img: `${IMG}/servicios/desparasitacion.jpg` },
  { label: 'Hospitalización', ratio: '4 / 5', bg: '#E7D6EE', tag: 'purple', img: `${IMG}/servicios/hospitalizacion.jpg` },
]

const FAQS = [
  { q: '¿Migo es gratis?', a: 'Sí. Para los dueños de mascotas Migo es gratis. Las clínicas y los veterinarios son quienes pagan por usar la plataforma.' },
  { q: '¿Está para iPhone?', a: 'Por ahora Migo está en Android, en Google Play. La versión para iPhone viene en camino.' },
  { q: '¿Cómo pago la consulta?', a: 'Ves el precio antes de agendar y pagas directamente en la clínica. Muy pronto también podrás pagar desde la app.' },
  { q: '¿Qué tan rápido responden en una urgencia?', a: 'El aviso llega al momento a las clínicas y veterinarios de guardia cerca de ti. Atiende el primero que acepta, y mientras tanto Migo IA te guía con primeros auxilios.' },
  { q: '¿Quién ve mis datos si alguien escanea la placa?', a: 'Solo la ficha pública de tu mascota. Tu teléfono queda oculto, salvo que tú decidas mostrarlo.' },
  { q: '¿Cómo sé que el veterinario es real?', a: 'Cada veterinario se verifica con su cédula y su carnet del Colegio de Médicos Veterinarios antes de atender en Migo.' },
]

const STEPS = [
  { n: '1', title: 'Descarga Migo', copy: 'Búscala en Google Play.' },
  { n: '2', title: 'Crea tu cuenta', copy: 'Con Google o con tu correo.' },
  { n: '3', title: 'Registra a tu mascota', copy: 'Nombre, raza, edad y una foto.' },
  { n: '4', title: '¡Listo!', copy: 'Busca clínicas cerca y agenda tu primera cita.' },
]

// Rastro de 8 huellas en diagonal por la sección "Qué es Migo".
const PAWS = (() => {
  const N = 8, out = []
  const P = (t) => ({ x: 4 + t * 92, y: 82 - t * 64 + Math.sin(t * Math.PI * 1.6) * 10 })
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), a = P(t), b = P(Math.min(1, t + 0.01)), c = P(Math.max(0, t - 0.01))
    const ang = Math.atan2(b.y - c.y, b.x - c.x)
    const side = i % 2 ? 1 : -1, off = 4
    out.push({
      x: `${a.x - Math.sin(ang) * off * side}%`,
      y: `${a.y + Math.cos(ang) * off * side * 1.6}%`,
      r: `${(ang * 180) / Math.PI + 90}deg`,
    })
  }
  return out
})()

const NAV_SECTIONS = ['como', 'registro', 'pro']

function useLandingMotion() {
  const refs = useRef({ paws: [], urg: [] })
  const [nav, setNav] = useState({ hidden: false, solid: false, active: '' })
  const [urg, setUrg] = useState(0)

  useEffect(() => {
    const r = refs.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const st = { lastY: window.scrollY, nav: { hidden: false, solid: false, active: '' }, urg: 0,
      svcA: 0, svcB: 0, mqX: 0, mqSpeed: 1, mqTarget: 1 }

    const onScroll = () => {
      const y = window.scrollY
      let hidden = st.nav.hidden
      if (y < 80) hidden = false
      else if (y > st.lastY + 4) hidden = true
      else if (y < st.lastY - 4) hidden = false
      st.lastY = y
      const mid = window.innerHeight * 0.35
      let active = ''
      NAV_SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const b = el.getBoundingClientRect()
        if (b.top <= mid && b.bottom > mid) active = id
      })
      const solid = y > 10
      const n = st.nav
      if (n.hidden !== hidden || n.solid !== solid || n.active !== active) {
        st.nav = { hidden, solid, active }
        setNav(st.nav)
      }
      const half = window.innerHeight / 2
      let act = 0
      r.urg.forEach((el, i) => { if (el && el.getBoundingClientRect().top < half) act = i })
      if (act !== st.urg) { st.urg = act; setUrg(act) }
    }

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const vh = window.innerHeight || 800
      const sy = window.scrollY
      const now = performance.now() / 1000

      if (r.float) r.float.style.transform = reduce ? 'rotate(-4deg)'
        : `translateY(${Math.sin(now * 1.1) * 12}px) rotate(${-4 + Math.sin(now * 0.7) * 1.5}deg)`

      if (r.heroPhone) {
        if (reduce || window.innerWidth <= 1000) {
          r.heroPhone.style.transform = 'rotate(-7deg)'
          r.heroPhone.style.opacity = 1
        } else {
          const p = Math.min(1, sy / vh)
          r.heroPhone.style.transform = `translateY(${-sy * 0.9}px) rotate(${-7 - p * 6}deg)`
          r.heroPhone.style.opacity = Math.max(0, 1 - Math.max(0, p - 0.45) / 0.4).toFixed(3)
        }
      }

      if (r.svc && r.svc1 && r.svc2 && !reduce && window.innerWidth > 900) {
        const b = r.svc.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (vh - b.top) / b.height))
        st.svcA += ((1 - p) * 80 - st.svcA) * 0.06
        st.svcB += ((1 - p) * 240 - st.svcB) * 0.035
        r.svc1.style.transform = `translateY(${st.svcA.toFixed(1)}px)`
        r.svc2.style.transform = `translateY(${st.svcB.toFixed(1)}px)`
      }

      if (r.mq && !reduce) {
        const loopW = r.mq.scrollWidth / 3
        // En celular el marquee está oculto (lo reemplaza el carrusel con flechas).
        if (window.innerWidth > 900) {
          st.mqSpeed += (st.mqTarget - st.mqSpeed) * 0.06
          st.mqX -= 0.42 * st.mqSpeed
          if (loopW && -st.mqX >= loopW) st.mqX += loopW
        }
        r.mq.style.transform = `translateX(${st.mqX.toFixed(1)}px)`
      }

      if (r.paws.length) {
        const N = r.paws.length, cyc = 8, ph = (now % cyc) / cyc
        r.paws.forEach((el, i) => {
          if (!el) return
          if (reduce) { el.style.opacity = 0.18; return }
          const age = ph - (i / N) * 0.6
          let o = 0
          if (age >= 0) o = age < 0.03 ? age / 0.03 : Math.max(0, 1 - (age - 0.03) / 0.35)
          el.style.opacity = (o * 0.22).toFixed(3)
        })
      }
    }

    r.pauseMarquee = () => { st.mqTarget = 0 }
    r.playMarquee = () => { st.mqTarget = 1 }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { refs, nav, urg }
}

function PlayIcon() {
  return (
    <svg width="26" height="28" viewBox="0 0 24 26" aria-hidden="true">
      <path d="M1.5 1.2 13.3 13 1.5 24.8c-.4-.2-.6-.7-.6-1.2V2.4c0-.5.2-1 .6-1.2Z" fill="#F6DE1E" />
      <path d="M17.3 9 13.3 13l4 4 4.6-2.6c1.3-.7 1.3-2.1 0-2.8L17.3 9Z" fill="#FFFFFF" />
      <path d="m1.5 1.2 11.8 11.8 4-4L3.5.6C2.7.1 2 .3 1.5 1.2Z" fill="#B66FC6" />
      <path d="m1.5 24.8 11.8-11.8 4 4-13.8 8.4c-.8.5-1.5.3-2-.6Z" fill="#EEDFF5" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true" fill="#290E31">
      <path d="M19.6 14.9c0-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.5-2-.2-3.8 1.1-4.8 1.1-1 0-2.5-1.1-4.1-1.1-2.1 0-4.1 1.2-5.2 3.1-2.2 3.8-.6 9.5 1.6 12.6 1 1.5 2.3 3.2 3.9 3.1 1.6-.1 2.2-1 4.1-1s2.5 1 4.1 1c1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.7-3.4 1.7-3.5-.1 0-3.2-1.2-3.2-5ZM16.5 5.6c.9-1.1 1.5-2.5 1.3-4-1.3.1-2.8.9-3.7 1.9-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.7-1.7Z" />
    </svg>
  )
}

function PawIcon(props) {
  return (
    <svg width="160" height="160" viewBox="0 0 24 24" fill="#8A2FA0" {...props}>
      <ellipse cx="5.5" cy="10" rx="2.3" ry="3" /><ellipse cx="9.5" cy="5.5" rx="2.3" ry="3" />
      <ellipse cx="14.5" cy="5.5" rx="2.3" ry="3" /><ellipse cx="18.5" cy="10" rx="2.3" ry="3" />
      <path d="M12 11c-3.3 0-6.5 4.6-6.5 7.4 0 2 1.6 3.1 3.4 3.1 1.2 0 2-.6 3.1-.6s1.9.6 3.1.6c1.8 0 3.4-1.1 3.4-3.1 0-2.8-3.2-7.4-6.5-7.4Z" />
    </svg>
  )
}

// Íconos de los 4 pasos (lavanda + detalles en amarillo Migo), en public/landing/pasos/.
const STEP_ICONS = ['1-descarga', '2-cuenta', '3-mascota', '4-listo']
function StepIllo({ i }) {
  return <img className={`lp-steps__icon lp-steps__icon--${i + 1}`} src={`${IMG}/pasos/${STEP_ICONS[i]}.svg`} alt="" aria-hidden="true" loading="lazy" />
}

function FeatureCard({ f }) {
  const imgStyle = f.phone
    ? { right: '6%', bottom: '-26%', width: '34%', transform: 'rotate(7deg)', padding: 8, borderRadius: 36, background: '#290E31', boxShadow: '0 30px 60px rgba(41,14,49,.25)' }
    : { right: '-12%', bottom: '-4%', width: '60%', transform: 'rotate(-6deg)' }
  return (
    <article className="lp-feature">
      <div className="lp-feature__body">
        <span className="lp-feature__big">{f.big}</span>
        <span className="lp-feature__sub">{f.sub}</span>
        <h3>{f.title}</h3>
        <p>{f.copy}</p>
        <a className="lp-feature__btn" href={PLAY}>{f.cta}</a>
      </div>
      <div className="lp-feature__img" aria-hidden="true" style={imgStyle}>
        <img src={f.img} alt="" loading="lazy" style={{ borderRadius: f.phone ? 28 : 0 }} />
      </div>
    </article>
  )
}

function ServiceTile({ s }) {
  return (
    <div className="lp-tile" style={{ aspectRatio: s.ratio, background: s.bg }}>
      {s.img
        ? <img src={s.img} alt="" loading="lazy" />
        : <span className="lp-tile__ph">Foto · {s.label}</span>}
      <span className={`lp-tile__tag lp-tag--${s.tag}`}>{s.label}</span>
    </div>
  )
}

// Carrusel de celular (funciones y servicios): una fila infinita con flechas centradas
// debajo, avance automático y deslizar con el dedo. La lista va triplicada; al pasar el
// final de la copia del medio se salta sin animación a la posición equivalente, así nunca
// se acaba. Tocarlo pausa el avance automático unos segundos.
const SVC_ALL = SVC_COL1.flatMap((s, i) => [s, SVC_COL2[i]]).filter(Boolean)
const AUTOPLAY_MS = 3500
const RESUME_MS = 6000

function LoopCarousel({ items: list, render, label, itemName, className = '' }) {
  const N = list.length
  const [idx, setIdx] = useState(N)
  const [anim, setAnim] = useState(true)
  const touch = useRef(null)
  const pausedUntil = useRef(0)
  const rootRef = useRef(null)
  const visible = useRef(false)
  const go = (d, user) => {
    if (user) pausedUntil.current = Date.now() + RESUME_MS
    setAnim(true)
    setIdx((i) => i + d)
  }
  const onEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (idx >= 2 * N || idx < N) {
      setAnim(false)
      setIdx((i) => ((i - N) % N + N) % N + N)
    }
  }
  useEffect(() => {
    if (!anim) {
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)))
      return () => cancelAnimationFrame(t)
    }
  }, [anim])
  // Avance automático: solo si el carrusel se ve en pantalla y nadie lo tocó hace poco.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const el = rootRef.current
    const io = new IntersectionObserver(([en]) => { visible.current = en.isIntersecting }, { threshold: 0.4 })
    if (el) io.observe(el)
    const t = setInterval(() => {
      if (visible.current && Date.now() > pausedUntil.current && el && el.offsetParent !== null) go(1)
    }, AUTOPLAY_MS)
    return () => { clearInterval(t); io.disconnect() }
  }, [])
  const items = [...list, ...list, ...list]
  return (
    <div ref={rootRef} className={`lp-car ${className}`} aria-roledescription="carrusel" aria-label={label}>
      <div className="lp-car__viewport"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; pausedUntil.current = Date.now() + RESUME_MS }}
        onTouchEnd={(e) => {
          if (touch.current == null) return
          const dx = e.changedTouches[0].clientX - touch.current
          touch.current = null
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1, true)
        }}>
        <div className="lp-car__track" onTransitionEnd={onEnd}
          style={{ transform: `translateX(calc(${-idx} * (var(--car-w) + var(--car-gap))))`, transition: anim ? 'transform .5s cubic-bezier(.22,.8,.3,1)' : 'none' }}>
          {items.map((it, i) => (
            <div key={i} className="lp-car__item" aria-hidden={i < N || i >= 2 * N ? 'true' : undefined}>
              {render(it)}
            </div>
          ))}
        </div>
      </div>
      <div className="lp-car__nav">
        <button type="button" onClick={() => go(-1, true)} aria-label={`${itemName} anterior`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <span aria-live="polite">{String(((idx - N) % N + N) % N + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
        <button type="button" onClick={() => go(1, true)} aria-label={`${itemName} siguiente`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`lp-faq__item${open ? ' is-open' : ''}`}>
      <button type="button" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <span className="lp-faq__icon" aria-hidden="true">{open ? '×' : '+'}</span>
      </button>
      {open && <p>{item.a}</p>}
    </div>
  )
}

export default function Home() {
  const { refs, nav, urg } = useLandingMotion()
  const r = refs.current
  const [faqOpen, setFaqOpen] = useState(0)
  const toggleFaq = (i) => setFaqOpen((o) => (o === i ? -1 : i))
  const storeTop = PLAY_LIVE ? 'Disponible en' : 'Muy pronto en'

  useEffect(() => {
    document.title = 'Migo · Tu mascota, bien cuidada a cualquier hora'
  }, [])

  return (
    <div className="lp">
      {/* [1] MENÚ */}
      <header className={`lp-nav${nav.solid ? ' is-solid' : ''}${nav.hidden ? ' is-hidden' : ''}`}>
        <nav className="lp-nav__inner" aria-label="Principal">
          <a href="#" className="lp-nav__logo" aria-label="Migo, inicio">
            <img src={`${IMG}/logo-migo.png`} alt="Migo" />
          </a>
          <div className="lp-nav__links">
            <a href="#como" className={nav.active === 'como' ? 'is-active' : ''}>Cómo funciona</a>
            <a href="#registro" className={nav.active === 'registro' ? 'is-active' : ''}>Regístrate</a>
            <a href="#pro" className={nav.active === 'pro' ? 'is-active' : ''}>Profesionales</a>
          </div>
          <a href={PLAY} className="lp-btn lp-btn--purple lp-nav__cta">Descargar Migo</a>
        </nav>
      </header>

      {/* [2] HERO */}
      <section className="lp-hero">
        <div className="lp-hero__main">
          <div className="lp-hero__tags">
            <span>Citas</span><i aria-hidden="true" /><span>Urgencias 24/7</span><i aria-hidden="true" />
            <span>Migo IA</span><i aria-hidden="true" /><span>Placa QR</span>
          </div>
          <svg className="lp-hero__wave" width="88" height="12" viewBox="0 0 88 12" fill="none" aria-hidden="true">
            <path d="M2 8c6-6 10 4 16-1s10 4 16-1 10 4 16-1 10 4 16-1 10 4 18-1" stroke="#8A2FA0" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <h1>Tu mascota, <b className="lp-purple">bien cuidada</b> a <b>cualquier hora.</b></h1>
          <p className="lp-hero__sub">Agenda con un vet cerca, pide ayuda en una urgencia y lleva su historial contigo. <strong>Gratis.</strong></p>
          <div className="lp-hero__cta">
            <a href={PLAY} className="lp-btn lp-btn--purple">Crear mi cuenta gratis</a>
            <a href="#pro" className="lp-hero__pro">¿Eres veterinario o tienes una clínica? →</a>
          </div>
        </div>

        <div className="lp-hero__phone" ref={(el) => { r.heroPhone = el }} aria-hidden="true">
          <img className="lp-phone-img" src={`${IMG}/app-home.png`} alt="" />
        </div>
        <div className="lp-stores">
          <span className="lp-stores__label">Descarga Migo</span>
          <a href={PLAY} className="lp-store lp-store--play">
            <PlayIcon /><span><small>{storeTop}</small><strong>Google Play</strong></span>
          </a>
          <span className="lp-store lp-store--ios">
            <AppleIcon /><span><small>Muy pronto en</small><strong>App Store</strong></span>
          </span>
        </div>
      </section>

      {/* QUÉ ES MIGO */}
      <section className="lp-showcase-wrap">
        <div className="lp-showcase-wrap__inner">
          <div className="lp-showcase">
            <div className="lp-paws" aria-hidden="true">
              {PAWS.map((p, i) => (
                <PawIcon key={i} ref={(el) => { r.paws[i] = el }}
                  style={{ left: p.x, top: p.y, transform: `translate(-50%,-50%) rotate(${p.r})` }} />
              ))}
            </div>
            <div className="lp-showcase__text">
              <span className="lp-kicker">Qué es Migo</span>
              <h2 className="lp-h2"><span className="lp-light">La app que cuida</span> a tu mascota.</h2>
              <p className="lp-lead">Migo es una app venezolana que conecta a los dueños de mascotas con veterinarios, clínicas, hospitales y centros de cuidado cerca de ti.</p>
            </div>
            <div className="lp-showcase__phone">
              <div className="lp-float" ref={(el) => { r.float = el }} aria-hidden="true">
                <img className="lp-phone-img" src={`${IMG}/app-home.png`} alt="" loading="lazy" />
              </div>
            </div>
            <div className="lp-who lp-card lp-card--glass">
              <span className="lp-kicker">Para quién</span>
              <ul>
                <li>
                  <span className="lp-who__head"><b>Dueños de mascotas</b><span className="lp-pill lp-pill--yellow">Gratis</span></span>
                  <span>Para cuidar a su mascota desde el teléfono, sin llamar clínica por clínica.</span>
                </li>
                <li>
                  <span className="lp-who__head"><b>Vets y clínicas</b><span className="lp-pill lp-pill--purple">Profesionales</span></span>
                  <span>Reciben pacientes y organizan su trabajo con Migo Vet o el panel web.</span>
                </li>
              </ul>
            </div>
            {/* Descarga: QR para escanear desde la compu + tiendas (solo escritorio, hueco de abajo a la derecha) */}
            <div className="lp-dl lp-card lp-card--glass">
              <span className="lp-kicker">Descarga Migo</span>
              <div className="lp-dl__row">
                <img className="lp-dl__qr" src={`${IMG}/qr-migo.svg`} alt="Código QR para descargar Migo" loading="lazy" />
                <p><b>Llévala en tu teléfono.</b> Escanea el código con la cámara y descárgala gratis.</p>
              </div>
              <div className="lp-dl__stores">
                <a href={PLAY} className="lp-store lp-store--play">
                  <PlayIcon /><span><small>{PLAY_LIVE ? 'Disponible en' : 'Muy pronto en'}</small><strong>Google Play</strong></span>
                </a>
                <span className="lp-store lp-store--ios">
                  <AppleIcon /><span><small>Muy pronto en</small><strong>App Store</strong></span>
                </span>
              </div>
            </div>
            <div className="lp-does lp-card">
              <span className="lp-kicker">Qué hace</span>
              <ol>
                <li><span>01</span><b>Te conecta</b><span>Con vets y clínicas verificados cerca de ti, para agendar sin llamar.</span></li>
                <li><span>02</span><b>Te ayuda en una urgencia</b><span>A cualquier hora, con Migo IA orientándote mientras llega la ayuda.</span></li>
                <li><span>03</span><b>Guarda su historia</b><span>Expediente, vacunas y una placa QR para que siempre vuelva a casa.</span></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <main className="lp-main">
        {/* [3] QUÉ PUEDES HACER */}
        <section id="como" className="lp-features">
          <span className="lp-kicker">Qué puedes hacer</span>
          <h2 className="lp-h2"><span className="lp-light">Todo lo que tu mascota necesita,</span><br />a la mano.</h2>
          <div className="lp-marquee lp-bleed"
            onMouseEnter={() => r.pauseMarquee?.()} onMouseLeave={() => r.playMarquee?.()}>
            <div className="lp-marquee__track" ref={(el) => { r.mq = el }}>
              {[0, 1, 2].flatMap((k) => FEATURES.map((f, i) => (
                <div key={`${k}-${i}`} aria-hidden={k > 0 ? 'true' : undefined} style={{ display: 'contents' }}>
                  <FeatureCard f={f} />
                </div>
              )))}
            </div>
          </div>
          <LoopCarousel className="lp-car--features" items={FEATURES} label="Qué puedes hacer" itemName="Función"
            render={(f) => <FeatureCard f={f} />} />
        </section>

        {/* URGENCIA PASO A PASO */}
        <section id="urgencias" className="lp-urg lp-bleed">
          <div className="lp-urg__grid">
            <aside>
              <div>
                <span className="lp-kicker">Alerta roja 24/7</span>
                <h2 className="lp-h2"><span className="lp-light">Así funciona</span> una urgencia en Migo.</h2>
              </div>
              <ol>
                {URG.map((s, i) => (
                  <li key={s.n} className={i === urg ? 'is-active' : ''}><span>{s.n}</span><span>{s.t}</span></li>
                ))}
              </ol>
            </aside>
            <div>
              {URG.map((s, i) => (
                <article key={s.n} className="lp-urg__step" ref={(el) => { r.urg[i] = el }}>
                  <div className="lp-urg__media">
                    <img className="lp-urg__photo" src={s.img} alt="" loading="lazy" />
                    <div className="lp-urg__card">
                      <span>{s.n}</span>
                      <h3>{s.t}</h3>
                      <p>{s.c}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="lp-svc" ref={(el) => { r.svc = el }}>
          <div className="lp-svc__grid">
            <aside>
              <div>
                <span className="lp-kicker">Servicios</span>
                <h2 className="lp-h2"><span className="lp-light">De la consulta</span> al baño de los sábados.</h2>
                <p className="lp-lead">Clínicas, hospitales 24 h, veterinarios independientes, peluquerías y spas. Filtra por servicio, mira precio y horario, y agenda.</p>
              </div>
              <div className="lp-svc__kinds">
                <div>
                  <span className="lp-tag lp-tag--purple">Salud</span>
                  <b>Veterinaria y clínicas</b>
                  <span>Consultas, vacunas, desparasitación, urgencias, videoconsulta y hospitalización, con vets verificados.</span>
                </div>
                <div>
                  <span className="lp-tag lp-tag--yellow">Cuidado</span>
                  <b>Estética, baños y spa</b>
                  <span>Baño, peluquería, corte de uñas y spa en centros cerca de ti, con precio en $ y Bs.</span>
                </div>
              </div>
              <a href={PLAY} className="lp-btn lp-btn--purple">Descargar Migo</a>
            </aside>
            <div className="lp-svc__cols">
              <div className="lp-svc__col" ref={(el) => { r.svc1 = el }}>
                {SVC_COL1.map((s) => <ServiceTile key={s.label} s={s} />)}
              </div>
              <div className="lp-svc__col" ref={(el) => { r.svc2 = el }}>
                {SVC_COL2.map((s) => <ServiceTile key={s.label} s={s} />)}
              </div>
            </div>
            <LoopCarousel className="lp-car--svc" items={SVC_ALL} label="Servicios" itemName="Servicio"
              render={(sv) => <ServiceTile s={{ ...sv, ratio: '4 / 5' }} />} />
          </div>
        </section>

        {/* [4] REGÍSTRATE EN 4 PASOS */}
        <section id="registro" className="lp-steps lp-bleed">
          <div className="lp-steps__inner">
            <span className="lp-kicker">Empieza hoy</span>
            <h2 className="lp-h2"><span className="lp-light">Regístrate en</span> 4 pasos.</h2>
            <ol>
              {STEPS.map((s, i) => (
                <li key={s.n}>
                  <span className="lp-steps__n">{s.n}</span>
                  <div className="lp-steps__illo"><StepIllo i={i} /></div>
                  <div><h3>{s.title}</h3><p>{s.copy}</p></div>
                </li>
              ))}
            </ol>
            <div className="lp-steps__foot">
              <div>
                <a href={PLAY} className="lp-btn lp-btn--yellow lp-btn--yellow-soft">Crear mi cuenta gratis</a>
                <small>{storeTop} Google Play</small>
              </div>
              <div className="lp-qr">
                <img className="lp-qr__box" src={`${IMG}/qr-migo.svg`} alt="Código QR para descargar Migo" loading="lazy" />
                <p><strong>¿Estás en la compu?</strong> Escanéalo con tu teléfono.</p>
              </div>
            </div>
          </div>
        </section>

        {/* POR QUÉ MIGO */}
        <section className="lp-why">
          <div className="lp-why__grid">
            <div className="lp-why__left">
              <div>
                <span className="lp-kicker">Por qué Migo</span>
                <h2 className="lp-h2"><span className="lp-light">Se acabó llamar</span> clínica por clínica.</h2>
              </div>
              <img className="lp-why__pup" src={`${IMG}/puppy-collar.png`} alt="Cachorro con collar y placa Migo" loading="lazy" />
            </div>
            <div className="lp-why__cards">
              <article className="lp-why__card lp-why__card--without">
                <span className="lp-kicker">Sin Migo</span>
                <ul>
                  {['En una urgencia llamas a ciegas, sin saber qué clínica está abierta ni cuál queda cerca.',
                    'Las vacunas viven en una libreta que se pierde.',
                    'Las citas se cuadran por WhatsApp, mensaje por mensaje.',
                    'Precios en dólares, cobrados en bolívares a una tasa que cambia cada día.'].map((t) => (
                    <li key={t}><span aria-hidden="true">×</span><span>{t}</span></li>
                  ))}
                </ul>
              </article>
              <article className="lp-why__card lp-why__card--with">
                <span className="lp-why__with"><span>Con</span><img src={`${IMG}/logo-migo-amarillo.png`} alt="Migo" /></span>
                <ul>
                  {['Un botón avisa a las clínicas y vets cercanos, con distancia y tiempo de llegada.',
                    'Su expediente y su cartilla de vacunas, siempre en tu teléfono.',
                    'Eliges día y hora, y la clínica confirma.',
                    'Precio en dólares y su equivalente en bolívares a tasa BCV del día.'].map((t) => (
                    <li key={t}><span aria-hidden="true">✓</span><span>{t}</span></li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* [5] PARA PROFESIONALES */}
        <section id="pro" className="lp-pro">
          <span className="lp-kicker">Para profesionales</span>
          <h2 className="lp-h2"><span className="lp-light">Recibe pacientes y</span> organiza tu trabajo.</h2>
          <div className="lp-pro__band">
            <div className="lp-pro__copy">
              <span className="lp-pro__badge">App Migo Vet</span>
              <h3><span className="lp-light">Para</span> veterinarios</h3>
              <p>Independiente o de clínica. Recibe citas y urgencias en tu zona y atiende por videollamada. Pagas la urgencia solo si la atiendes.</p>
              <span className="lp-pro__needs">Necesitas: <strong>cédula + carnet del CMV</strong></span>
              <a href={VET_URL} className="lp-btn lp-btn--yellow">Regístrate en Migo Vet</a>
            </div>
            <div className="lp-pro__mock" aria-hidden="true">
              <div className="lp-pro__bubble">Nueva urgencia a 2,1 km: Luna, poodle de 3 años, vómitos desde anoche.</div>
              <div className="lp-pro__list">
                <div className="lp-pro__row"><span><strong>Luna · Poodle</strong><small>Gravedad media · Migo IA</small></span><em className="is-yellow">Urgencia</em></div>
                <div className="lp-pro__row"><span><strong>Toddy · Mestizo</strong><small>Hoy 4:30 p. m.</small></span><em>Cita</em></div>
                <div className="lp-pro__row"><span><strong>Kira · Siamés</strong><small>Mañana 10:00 a. m.</small></span><em>Video</em></div>
              </div>
              <b>Todo desde tu teléfono</b>
              <div className="lp-chips"><span>Citas</span><span>Urgencias</span><span>Videollamada</span><span>Expedientes</span><span>Plan gratis</span></div>
            </div>
          </div>
          <div className="lp-pro__band lp-pro__band--flip">
            <div className="lp-pro__copy">
              <span className="lp-pro__badge">Panel web</span>
              <h3><span className="lp-light">Para</span> clínicas y centros</h3>
              <p>Clínicas, hospitales 24 h, peluquerías y spas. Sal en el mapa y maneja agenda, equipo, servicios y finanzas en un mismo panel.</p>
              <span className="lp-pro__needs">Necesitas: <strong>RIF, dirección y horario</strong></span>
              <a href={PANEL_URL} className="lp-btn lp-btn--yellow" target="_blank" rel="noopener noreferrer">Registra tu local</a>
            </div>
            <div className="lp-pro__mock" aria-hidden="true">
              <div className="lp-pro__bubble">Hoy en Clínica Los Palos Grandes</div>
              <div className="lp-pro__list">
                <div className="lp-pro__row"><span><strong>12 citas</strong><small>3 vets de guardia</small></span><em>Agenda</em></div>
                <div className="lp-pro__row"><span><strong>2 urgencias</strong><small>Atendidas · 1 en curso</small></span><em className="is-yellow">24 h</em></div>
                <div className="lp-pro__row"><span><strong>Baño y peluquería</strong><small>6 cupos libres</small></span><em>Servicios</em></div>
              </div>
              <b>Sin licencia aparte</b>
              <div className="lp-chips"><span>Agenda</span><span>Equipo</span><span>Guardias</span><span>Servicios</span><span>Finanzas</span></div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="faq" className="lp-faq">
          <div className="lp-faq__head">
            <span>Preguntas frecuentes</span>
            <h2 className="lp-h2"><span className="lp-light">Lo que necesitas saber</span> antes de descargar Migo.</h2>
          </div>
          <div className="lp-faq__grid">
            {[0, 1].map((col) => (
              <div key={col} className="lp-faq__col">
                {FAQS.map((item, i) => (i % 2 === col
                  ? <FaqItem key={item.q} item={item} open={faqOpen === i} onToggle={() => toggleFaq(i)} />
                  : null))}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* [6] CTA FINAL + [7] PIE */}
      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__cta">
            <div>
              <h2 className="lp-h2"><span className="lp-light">Tu amigo merece</span> lo mejor.<br /><span className="lp-light">Empieza</span> gratis.</h2>
              <div className="lp-footer__buttons">
                <a href={PLAY} className="lp-btn lp-btn--yellow lp-btn--yellow-white">Descargar Migo</a>
                <small>{storeTop} Google Play</small>
              </div>
            </div>
            <img className="lp-footer__logo" src={`${IMG}/logo-migo-amarillo.png`} alt="" loading="lazy" />
          </div>
          <div className="lp-footer__bar">
            <nav aria-label="Pie de página">
              <a href="#faq">Preguntas frecuentes</a>
              <Link to="/contacto">Contacto</Link>
              <Link to="/privacidad">Privacidad</Link>
              <Link to="/eliminar-cuenta">Eliminar cuenta</Link>
            </nav>
            <span>© {new Date().getFullYear()} Migo · Hecho en Venezuela</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
