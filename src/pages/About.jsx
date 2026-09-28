import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import '../styles/legal.css'

export default function About() {
  return (
    <Section
      title="Nosotros"
      subtitle="Migo nació de una madrugada buscando a quién llamar."
    >
      <div className="legal">
        <p>
          <strong>Migo</strong> es una aplicación venezolana para el cuidado de
          mascotas. Conecta a quienes viven con un perro o un gato con las
          clínicas y los veterinarios que pueden atenderlos, y guarda en un solo
          lugar la historia médica del animal.
        </p>

        <h3>El problema que resolvemos</h3>
        <p>
          Cuando una mascota se enferma de madrugada, la búsqueda empieza de
          cero: llamadas a ciegas, grupos de WhatsApp, clínicas que no contestan
          y ninguna forma de saber cuál está abierta. Mientras tanto, la historia
          clínica del animal vive repartida entre carnets de papel, capturas de
          pantalla y la memoria de quien lo cuida.
        </p>
        <p>
          Del otro lado pasa lo mismo: clínicas y veterinarios independientes no
          tienen cómo recibir esas urgencias ni cómo darse a conocer a quien los
          necesita a dos cuadras.
        </p>

        <h3>Qué hace Migo</h3>
        <ul>
          <li>
            <strong>Emergencias 24/7:</strong> un botón de urgencia que describe
            el caso, lo clasifica con IA y lo hace llegar a las clínicas abiertas
            más cercanas.
          </li>
          <li>
            <strong>Teleconsulta:</strong> video con veterinarios verificados y
            récipe digital.
          </li>
          <li>
            <strong>Agenda:</strong> citas en clínicas aliadas con recordatorios.
          </li>
          <li>
            <strong>Expediente y cartilla:</strong> consultas, vacunas y récipes
            centralizados y siempre a mano.
          </li>
          <li>
            <strong>Aliados:</strong> peluquería canina y comercios de confianza
            cerca de ti.
          </li>
        </ul>

        <h3>Para quién es</h3>
        <p>
          Para familias con mascota en Venezuela que quieren respuestas claras a
          cualquier hora, y para las clínicas, veterinarios independientes y
          comercios que quieren atender a esas familias y hacer crecer su
          práctica.
        </p>

        <h3>En qué punto estamos</h3>
        <p>
          Migo está en fase de lanzamiento: la app está terminada y en pruebas, y
          estamos sumando las primeras clínicas y comercios aliados. Todavía no
          publicamos cifras de usuarios ni testimonios porque preferimos no
          inventarlos.
        </p>

        <p className="legal__nota">
          ¿Eres clínica, veterinario o comercio y quieres estar entre los
          primeros? <Link to="/contacto">Escríbenos</Link>.
        </p>
      </div>
    </Section>
  )
}
