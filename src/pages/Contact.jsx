import { useState } from 'react'
import Section from '../components/Section.jsx'

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con el backend / servicio de email real.
    console.log('Formulario enviado:', form)
    setEnviado(true)
  }

  return (
    <Section title="Contacto" subtitle="Escríbenos y te respondemos.">
      {enviado ? (
        <p className="prose">¡Gracias! Te contactaremos pronto.</p>
      ) : (
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

          <button className="btn btn--primary" type="submit">
            Enviar
          </button>
        </form>
      )}
    </Section>
  )
}
