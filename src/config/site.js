// Datos del sitio en un solo lugar: cámbialos aquí y se actualiza todo.
export const SITE = {
  name: 'Migo',
  tagline: 'Pendiente de definir',
  description: 'Sitio web de Migo.',
  email: '',
  social: {
    instagram: '',
    linkedin: '',
    github: 'https://github.com/josemob/MigoSite',
  },
}

// Datos del responsable de los datos personales.
//
// Google Play verifica que la política de privacidad identifique a quién
// responde por los datos y ofrezca un contacto real. Mientras estos campos
// estén vacíos, las páginas legales lo señalan en pantalla en vez de publicar
// una política incompleta (que es motivo de rechazo de la ficha).
export const LEGAL = {
  entity: '', // razón social, ej. 'Migo Clínicas Veterinarias C.A.'
  rif: '', // ej. 'J-40123456-7'
  email: '', // buzón de privacidad, ej. 'privacidad@holamigo.app'
  location: 'Caracas, Venezuela',
  updatedAt: '21 de septiembre de 2026',
}

// Fichas de la app. Mientras la URL esté vacía, la landing muestra "Muy
// pronto en Google Play" en vez de un botón que no lleva a ninguna parte.
export const STORE = {
  android: '', // ej. 'https://play.google.com/store/apps/details?id=app.holamigo.client'
  ios: '',
}

export const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

// Enlaces legales: van en el pie, no en la navegación principal.
export const LEGAL_LINKS = [
  { to: '/privacidad', label: 'Privacidad' },
  { to: '/eliminar-cuenta', label: 'Eliminar cuenta' },
]
