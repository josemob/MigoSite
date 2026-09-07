# MigoSite

Sitio web de **Migo**, construido con React + Vite.

Estado actual: **esqueleto**. La estructura, el ruteo y el sistema de estilos
están listos; el contenido real está pendiente de definir.

## Requisitos

- Node.js 20 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en http://localhost:5173

## Scripts

| Comando           | Qué hace                                  |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en vivo |
| `npm run build`   | Compila a producción en `dist/`            |
| `npm run preview` | Sirve localmente lo compilado en `dist/`   |

## Estructura

```
src/
├─ main.jsx              punto de entrada (monta React y el router)
├─ App.jsx               definición de rutas
├─ index.css             estilos base y de componentes
├─ config/
│  └─ site.js            nombre, tagline, redes y links del menú
├─ components/
│  ├─ Layout.jsx         navbar + contenido + footer
│  ├─ Navbar.jsx         menú con versión móvil
│  ├─ Footer.jsx
│  ├─ Container.jsx      ancho máximo centrado
│  └─ Section.jsx        bloque reutilizable con título y subtítulo
├─ pages/
│  ├─ Home.jsx
│  ├─ About.jsx          /nosotros
│  ├─ Contact.jsx        /contacto (formulario sin backend todavía)
│  └─ NotFound.jsx       404
└─ styles/
   └─ tokens.css         colores, tipografía y espaciado (incluye modo oscuro)
```

## Por dónde empezar a personalizar

1. **`src/config/site.js`** — nombre, tagline, email, redes y los links del menú.
2. **`src/styles/tokens.css`** — paleta y tipografía. Cambiar `--color-brand`
   reajusta botones y estados activos en todo el sitio.
3. **`src/pages/Home.jsx`** — el hero y los bloques de contenido.

Para agregar una página nueva: crea el archivo en `src/pages/`, registra la ruta
en `src/App.jsx` y añade el link en `NAV_LINKS` dentro de `src/config/site.js`.

## Pendientes

- [ ] Definir el contenido real (qué es Migo, secciones, textos)
- [ ] Logo e imágenes en `public/`
- [ ] Conectar el formulario de contacto a un backend o servicio de email
- [ ] Elegir hosting y configurar el despliegue
