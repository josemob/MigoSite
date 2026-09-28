import { useState } from 'react'
import Section from '../components/Section.jsx'
import { SITE } from '../config/site.js'
import '../styles/legal.css'

// El sitio es estático: no hay backend al que enviar el formulario. En vez de
// simular un envío (y dejar mensajes en el vacío), se compone un correo con lo
// que la persona escribió y se abre en su cliente. Si todavía no hay buzón
// configurado, se dice en pantalla en lugar de fingir que llegó.
export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [abierto, setAbierto] = useState(false)
  const destino = SITE.email

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!destino) return
    const asunto = `Contacto desde el sitio — ${form.nombre}`
    const cuerpo = `${form.mensaje}\n\n—\n${form.nombre}\n${form.email}`
    window.location.href = `mailto:${destino}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpo)}`
    setAbierto(true)
  }

  return (
    <Section
      title="Contacto"
      subtitle="¿Eres clínica, veterinario o comercio? Escríbenos."
    >
      {!destino && (
        <p className="legal__nota" style={{ marginBottom: 'var(--space-4)' }}>
          <span className="legal__falta">[completar correo de contacto]</span>{' '}
          Todavía no hay un buzón publicado en el sitio, así que este formulario
          no puede enviar nada. Configura <code>SITE.email</code> en{' '}
          <code>src/config/site.js</code>.
        </p>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field__label">Nombre</span>
          <input
            className="field__input"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="field__input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span className="field__label">Mensaje</span>
          <textarea
            className="field__input"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn--primary" type="submit" disabled={!destino}>
          Abrir en mi correo
        </button>
      </form>

      {abierto && (
        <p className="prose">
          Abrimos tu gestor de correo con el mensaje listo. Si no se abrió,
          escríbenos a <a href={`mailto:${destino}`}>{destino}</a>.
        </p>
      )}
    </Section>
  )
}
