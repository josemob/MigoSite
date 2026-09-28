import Section from '../components/Section.jsx'
import { LEGAL } from '../config/site.js'
import '../styles/legal.css'

/** Marca un dato que aún no se ha completado en config/site.js. */
function Falta({ campo }) {
  return <mark className="legal__falta">[completar {campo} en config/site.js]</mark>
}

const Dato = ({ valor, campo }) => (valor ? <>{valor}</> : <Falta campo={campo} />)

export default function Privacidad() {
  return (
    <Section
      title="Política de privacidad"
      subtitle={`Aplica a las apps Migo y Migo Vet y a los paneles web. Última actualización: ${LEGAL.updatedAt}.`}
    >
      <div className="legal">
        <p>
          Esta política explica qué datos recogemos cuando usas Migo, para qué los usamos y qué
          control tienes sobre ellos. Está escrita para que se entienda: si algo no queda claro,
          escríbenos y lo corregimos.
        </p>
        <p>
          El responsable de los datos es <strong><Dato valor={LEGAL.entity} campo="la razón social" /></strong>
          {LEGAL.rif ? <>, RIF {LEGAL.rif}</> : <>, RIF <Falta campo="el RIF" /></>}, con domicilio en{' '}
          {LEGAL.location}. Para cualquier asunto de privacidad:{' '}
          <Dato valor={LEGAL.email} campo="el correo de privacidad" />.
        </p>

        <h3>1. Qué datos recogemos</h3>
        <div className="legal__tabla-wrap">
          <table className="legal__tabla">
            <thead>
              <tr>
                <th>Dato</th>
                <th>Para qué</th>
                <th>¿Obligatorio?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre y apellido</td>
                <td>Identificarte ante la clínica que te atiende</td>
                <td>Sí</td>
              </tr>
              <tr>
                <td>Correo electrónico</td>
                <td>Crear tu cuenta y acceder</td>
                <td>Sí</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>Que la clínica pueda contactarte por una urgencia o una cita</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Cédula de identidad</td>
                <td>Que la clínica encuentre tu historial cuando llegas al consultorio</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Foto de perfil e imágenes que envías</td>
                <td>Tu perfil y los adjuntos del chat con la clínica</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Ubicación precisa</td>
                <td>Enrutar tu urgencia a las clínicas más cercanas y ordenar el directorio</td>
                <td>Sí, para usar urgencias</td>
              </tr>
              <tr>
                <td>Mensajes del chat</td>
                <td>Tu conversación con la clínica y su seguimiento</td>
                <td>Solo si usas el chat</td>
              </tr>
              <tr>
                <td>Cámara y micrófono</td>
                <td>Videoconsulta. Solo se usan mientras la llamada está en curso</td>
                <td>Solo durante la llamada</td>
              </tr>
              <tr>
                <td>Historial de pagos y recibos</td>
                <td>Cobrar las consultas y dejarte el comprobante</td>
                <td>Sí, al pagar</td>
              </tr>
              <tr>
                <td>Actividad en la app</td>
                <td>Citas, consultas y calificaciones: es el servicio en sí</td>
                <td>Sí</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="legal__nota">
          No recogemos datos de salud tuyos. Los expedientes clínicos de Migo son de animales.
        </p>

        <h3>2. Los datos de tu mascota</h3>
        <p>
          Guardamos el nombre, especie, raza, fecha de nacimiento, peso, microchip, alergias y
          condiciones especiales de tu mascota, junto con su cartilla de vacunación y el expediente
          de cada consulta. Esa información es tuya y de los veterinarios que te atienden a través
          de Migo. No la vendemos ni la cedemos a terceros con fines comerciales.
        </p>

        <h3>3. Por qué usamos tu ubicación</h3>
        <p>
          Es el dato más sensible que manejamos, así que lo explicamos aparte. Usamos tu ubicación
          precisa para dos cosas: calcular qué clínicas y veterinarios están cerca cuando activas
          una urgencia, y ordenar el directorio por cercanía. Cuando despachas una urgencia, las
          clínicas a las que se envía la alerta ven tu ubicación, porque la necesitan para llegar.
        </p>
        <p>
          Puedes negar el permiso de ubicación y seguir usando el resto de la app; solo perderás el
          enrutamiento automático de urgencias y el orden por cercanía del directorio. El permiso se
          revoca cuando quieras desde los ajustes de tu teléfono.
        </p>

        <h3>4. Con quién los compartimos</h3>
        <p>
          Con las clínicas y veterinarios que te atienden, que es el propósito del servicio, y con
          los proveedores que hacen funcionar la app:
        </p>
        <ul>
          <li>
            <strong>GetStream</strong>: mensajes, adjuntos y la señal de las videollamadas.
          </li>
          <li>
            <strong>Firebase Cloud Messaging (Google)</strong>: el identificador de tu dispositivo,
            para enviarte notificaciones.
          </li>
          <li>
            <strong>Google Gemini</strong>: el texto que escribes al asistente, para orientarte y
            clasificar la urgencia.
          </li>
          <li>
            <strong>La pasarela de pago</strong>: los datos de la transacción cuando pagas.
          </li>
          <li>
            <strong>OpenStreetMap</strong>: las coordenadas para dibujar mapas y buscar direcciones.
            Las consultas pasan por nuestros servidores, no desde tu teléfono.
          </li>
        </ul>
        <p>No vendemos tus datos a nadie, ni los usamos para publicidad de terceros.</p>

        <h3>5. Cómo los protegemos y cuánto los guardamos</h3>
        <p>
          Todo el tráfico entre la app y nuestros servidores viaja cifrado por HTTPS. Las
          contraseñas se guardan con un resumen criptográfico, nunca en texto plano.
        </p>
        <p>
          Conservamos tus datos mientras tengas cuenta activa. Los expedientes clínicos de tu
          mascota se conservan mientras la cuenta exista, porque forman su historia médica y la
          clínica puede necesitarlos en una consulta futura.
        </p>

        <h3>6. Tus derechos</h3>
        <p>
          Puedes consultar, corregir o eliminar tus datos en cualquier momento. Desde la app, en
          Perfil → Configuración, cambias tu información personal y también puedes{' '}
          <strong>eliminar tu cuenta</strong>: al hacerlo anonimizamos tus datos personales, liberamos
          tu correo, teléfono y cédula, y cerramos todas tus sesiones.
        </p>
        <p>
          Si ya no tienes la app instalada, puedes pedir la eliminación desde{' '}
          <a href="/eliminar-cuenta">esta página</a> o escribiendo a{' '}
          <Dato valor={LEGAL.email} campo="el correo de privacidad" />.
        </p>

        <h3>7. Menores de edad</h3>
        <p>
          Migo no está dirigida a menores de 18 años y no recogemos datos de menores a sabiendas. Si
          detectamos una cuenta de un menor, la eliminamos.
        </p>

        <h3>8. Cambios</h3>
        <p>
          Si cambiamos esta política, actualizamos la fecha del encabezado. Si el cambio afecta de
          forma significativa a cómo tratamos tus datos, te avisamos dentro de la app.
        </p>

        <h3>9. Contacto</h3>
        <p>
          Para ejercer cualquiera de tus derechos o hacernos una pregunta sobre privacidad, escribe
          a <Dato valor={LEGAL.email} campo="el correo de privacidad" />. Respondemos en un plazo
          máximo de 30 días.
        </p>
      </div>
    </Section>
  )
}
