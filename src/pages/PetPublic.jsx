import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../config/site.js'
import '../styles/pet-public.css'

// Página que abre quien escanea la placa QR de un collar: /m/:código.
//
// La persona que llega aquí no tiene Migo, está en la calle con un animal
// asustado y probablemente apurada. Todo apunta a una sola acción: avisarle a
// su familia. El teléfono del dueño solo aparece si la mascota está marcada
// como extraviada y el dueño eligió mostrarlo (lo decide el backend).

const ESPECIE = {
  DOG: '🐶', CAT: '🐱', BIRD: '🐦', RABBIT: '🐰', REPTILE: '🦎', RODENT: '🐹', OTHER: '🐾',
}
const SEXO = { MALE: 'Macho', FEMALE: 'Hembra' }

// Concordancia: "cómo la ves" para Luna, "cómo lo ves" para Rocco. Si no se sabe
// el sexo, se reformula la frase para no tener que elegir.
const pronombre = (sex) => (sex === 'FEMALE' ? 'la' : sex === 'MALE' ? 'lo' : null)

// El backend está en el plan gratis de Render y se duerme sin tráfico: la
// primera visita puede tardar medio minuto. Pasado este tiempo lo decimos, para
// que nadie cierre la página creyendo que está rota.
const AVISO_LENTO_MS = 6000

const fecha = (iso) =>
  new Date(iso).toLocaleDateString('es-VE', { day: 'numeric', month: 'long' })

// Teléfono venezolano tal como lo guarda la gente ("0414-123 4567", "+58 414…")
// a solo dígitos con prefijo de país, que es lo que pide wa.me.
const aWhatsApp = (tel) => {
  const d = (tel || '').replace(/\D/g, '')
  if (!d) return null
  if (d.startsWith('58')) return d
  if (d.startsWith('0')) return '58' + d.slice(1)
  return d
}

export default function PetPublic() {
  const { code } = useParams()
  const [estado, setEstado] = useState('cargando') // cargando | lista | no-existe | error
  const [lento, setLento] = useState(false)
  const [pet, setPet] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    const t = setTimeout(() => setLento(true), AVISO_LENTO_MS)
    fetch(`${API_URL}/public/pets/${encodeURIComponent(code)}`, { signal: ctrl.signal })
      .then(async (r) => {
        if (r.status === 404 || r.status === 400) return setEstado('no-existe')
        if (!r.ok) throw new Error(String(r.status))
        setPet(await r.json())
        setEstado('lista')
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setEstado('error')
      })
      .finally(() => clearTimeout(t))
    return () => {
      ctrl.abort()
      clearTimeout(t)
    }
  }, [code])

  // Título de la pestaña: es lo que se ve si la persona comparte el enlace.
  useEffect(() => {
    if (pet) document.title = pet.lostMode ? `${pet.name} se perdió · Migo` : `${pet.name} · Migo`
  }, [pet])

  return (
    <div className="mpet">
      <header className="mpet-top">
        <Link to="/" aria-label="Migo, ir al inicio">
          <img src="/img/migo-logo.svg" alt="Migo" className="mpet-top__logo" />
        </Link>
      </header>

      <main className="mpet-main">
        {estado === 'cargando' && (
          <div className="mpet-estado" role="status">
            <span className="mpet-spinner" aria-hidden="true" />
            <p>Buscando la ficha de esta mascota…</p>
            {lento && (
              <p className="mpet-estado__nota">
                Puede tardar unos segundos más la primera vez. No cierres la página.
              </p>
            )}
          </div>
        )}

        {estado === 'no-existe' && (
          <div className="mpet-estado">
            <p className="mpet-estado__titulo">No encontramos esta placa</p>
            <p>
              Revisa que el código <strong>{code?.toUpperCase()}</strong> esté bien
              escrito. Si la placa está rayada, prueba a escanear el QR de nuevo.
            </p>
          </div>
        )}

        {estado === 'error' && (
          <div className="mpet-estado">
            <p className="mpet-estado__titulo">No pudimos cargar la ficha</p>
            <p>Revisa tu conexión a internet e intenta otra vez.</p>
            <button className="mpet-btn mpet-btn--claro" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        )}

        {estado === 'lista' && pet && <Ficha pet={pet} code={code} />}
      </main>

      <footer className="mpet-pie">
        <p>¿Tu mascota no tiene placa?</p>
        <Link to="/" className="mpet-pie__link">
          Créale una gratis con Migo
        </Link>
      </footer>
    </div>
  )
}

function Ficha({ pet, code }) {
  const [abierto, setAbierto] = useState(false)
  const perdida = pet.lostMode && pet.lost
  const detalles = [pet.breed, SEXO[pet.sex], pet.color].filter(Boolean).join(' · ')
  const tel = perdida ? pet.lost.ownerPhone : null
  const wa = aWhatsApp(tel)
  const cuidados = perdida
    ? [
        pet.lost.specialCondition,
        pet.lost.allergies?.length ? `Alergia: ${pet.lost.allergies.join(', ')}` : null,
      ].filter(Boolean)
    : []

  return (
    <article className={`mpet-ficha ${perdida ? 'is-perdida' : ''}`}>
      {perdida && (
        <div className="mpet-alerta" role="alert">
          <span className="mpet-alerta__punto" aria-hidden="true" />
          Me perdí{pet.lost.since ? ` el ${fecha(pet.lost.since)}` : ''}
        </div>
      )}

      <div className="mpet-foto">
        {pet.photoUrl ? (
          <img src={pet.photoUrl} alt={`Foto de ${pet.name}`} />
        ) : (
          <span className="mpet-foto__vacia" aria-hidden="true">
            {ESPECIE[pet.species] ?? '🐾'}
          </span>
        )}
      </div>

      <h1 className="mpet-nombre">{pet.name}</h1>
      {pet.alias && <p className="mpet-alias">“{pet.alias}”</p>}
      {detalles && <p className="mpet-detalles">{detalles}</p>}

      {perdida ? (
        <>
          {pet.lost.message && (
            <figure className="mpet-mensaje">
              <figcaption>Mensaje de su familia</figcaption>
              <blockquote>{pet.lost.message}</blockquote>
            </figure>
          )}
          {cuidados.length > 0 && (
            <section className="mpet-cuidados" aria-label="Importante para cuidarla">
              <h2>Importante mientras está contigo</h2>
              <ul>
                {cuidados.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <p className="mpet-familia">
          Tengo una familia que me cuida. Si me ves por la calle sin ellos,
          avísales aquí: les llega al momento.
        </p>
      )}

      {!abierto ? (
        <div className="mpet-acciones">
          <button className="mpet-btn mpet-btn--principal" onClick={() => setAbierto(true)}>
            {perdida ? `Encontré a ${pet.name}` : 'Avisar a su familia'}
          </button>
          {tel && (
            <div className="mpet-contacto">
              <a className="mpet-btn mpet-btn--claro" href={`tel:${tel.replace(/[^\d+]/g, '')}`}>
                Llamar{pet.lost.ownerFirstName ? ` a ${pet.lost.ownerFirstName}` : ''}
              </a>
              {wa && (
                <a
                  className="mpet-btn mpet-btn--claro"
                  href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hola, encontré a ${pet.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      ) : (
        <Aviso pet={pet} code={code} />
      )}

      <p className="mpet-codigo">
        Placa <strong>{pet.code}</strong>
      </p>
    </article>
  )
}

function Aviso({ pet, code }) {
  const [mensaje, setMensaje] = useState('')
  const [contacto, setContacto] = useState('')
  const [ubicacion, setUbicacion] = useState(true)
  const [estado, setEstado] = useState('editando') // editando | enviando | enviado | error
  const [error, setError] = useState('')

  // La ubicación la pide el navegador con su propio aviso de permiso: ese es el
  // consentimiento real. Si la persona dice que no, el aviso sale igual sin ella.
  const posicion = () =>
    new Promise((ok) => {
      if (!ubicacion || !navigator.geolocation) return ok(null)
      navigator.geolocation.getCurrentPosition(
        (p) => ok({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => ok(null),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
      )
    })

  const enviar = async (e) => {
    e.preventDefault()
    setEstado('enviando')
    setError('')
    try {
      const pos = await posicion()
      const r = await fetch(`${API_URL}/public/pets/${encodeURIComponent(code)}/found`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: mensaje.trim() || undefined,
          contact: contacto.trim() || undefined,
          ...(pos ?? {}),
        }),
      })
      if (!r.ok) {
        const j = await r.json().catch(() => null)
        throw new Error(j?.message || 'No pudimos enviar el aviso.')
      }
      setEstado('enviado')
    } catch (err) {
      setError(err.message || 'No pudimos enviar el aviso.')
      setEstado('error')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="mpet-gracias" role="status">
        <p className="mpet-gracias__titulo">¡Gracias!</p>
        <p>
          La familia de {pet.name} ya recibió tu aviso
          {contacto.trim() ? ' y podrá contactarte' : ''}. Si puedes, quédate cerca
          un rato más.
        </p>
      </div>
    )
  }

  return (
    <form className="mpet-form" onSubmit={enviar}>
      <label className="mpet-campo">
        <span>
          {pronombre(pet.sex) ? `¿Dónde está y cómo ${pronombre(pet.sex)} ves?` : '¿Dónde está y cómo se ve?'}
        </span>
        <textarea
          rows={3}
          maxLength={500}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder={`Ej.: está conmigo en la plaza, tranquilo y con agua.`}
        />
      </label>

      <label className="mpet-campo">
        <span>
          Tu teléfono <em>(opcional)</em>
        </span>
        <input
          type="tel"
          inputMode="tel"
          maxLength={80}
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          placeholder="Para que puedan llamarte"
        />
      </label>

      <label className="mpet-check">
        <input type="checkbox" checked={ubicacion} onChange={(e) => setUbicacion(e.target.checked)} />
        <span>Compartir mi ubicación. Solo la recibe su familia.</span>
      </label>

      {error && (
        <p className="mpet-error" role="alert">
          {error}
        </p>
      )}

      <button className="mpet-btn mpet-btn--principal" type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar aviso'}
      </button>
    </form>
  )
}
