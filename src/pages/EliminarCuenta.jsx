import Section from '../components/Section.jsx'
import { LEGAL } from '../config/site.js'
import '../styles/legal.css'

/**
 * Google Play exige que una app con registro de cuenta ofrezca un modo de pedir
 * la eliminación **desde la web**, accesible sin instalar la app. Esta página es
 * esa URL; la vía preferente sigue siendo hacerlo dentro de la app.
 */
export default function EliminarCuenta() {
  const correo = LEGAL.email || '[completar el correo de privacidad en config/site.js]'

  return (
    <Section
      title="Eliminar tu cuenta de Migo"
      subtitle="Puedes hacerlo tú mismo desde la app, o pedírnoslo desde aquí."
    >
      <div className="legal">
        <h3>Desde la app (inmediato)</h3>
        <p>Es la vía más rápida, y el borrado se aplica en el momento:</p>
        <ol>
          <li>Abre Migo y entra a tu perfil.</li>
          <li>
            Entra en <strong>Configuración</strong> y baja hasta el final de la pantalla.
          </li>
          <li>
            Pulsa <strong>Eliminar Cuenta</strong> y confirma con tu contraseña.
          </li>
        </ol>

        <h3>Sin la app instalada</h3>
        <p>
          Escríbenos a <strong>{correo}</strong> desde el mismo correo con el que te registraste,
          con el asunto <em>“Eliminar mi cuenta”</em>. Verificamos que la solicitud venga de ti y la
          procesamos en un máximo de 30 días.
        </p>

        <h3>Qué pasa cuando eliminas tu cuenta</h3>
        <p>Se elimina o se anonimiza de forma irreversible:</p>
        <ul>
          <li>Tu nombre, correo, teléfono, cédula y foto de perfil.</li>
          <li>Tus sesiones abiertas y las notificaciones a tu dispositivo.</li>
          <li>Los perfiles de tus mascotas y su historial dentro de tu cuenta.</li>
        </ul>
        <p>
          Tu correo, teléfono y cédula quedan liberados, así que puedes volver a registrarte con
          ellos más adelante si quieres.
        </p>

        <h3>Qué conservamos, y por qué</h3>
        <p>
          Conservamos los comprobantes de las transacciones que hayas realizado, sin datos que te
          identifiquen, porque la normativa fiscal obliga a guardarlos. Las clínicas que te
          atendieron conservan su propia constancia de la atención prestada, como exige el ejercicio
          veterinario. Nada de eso queda asociado a tu identidad en Migo.
        </p>
        <p className="legal__nota">
          La eliminación no se puede deshacer. Si solo quieres dejar de recibir avisos, puedes
          desactivar las notificaciones en Configuración sin borrar la cuenta.
        </p>
      </div>
    </Section>
  )
}
