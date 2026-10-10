# Pulso IA — Entrega previa 2 (Semana 5)

Plataforma web de noticias sobre inteligencia artificial.
Módulo de Desarrollo Front-end, Politécnico Grancolombiano.

Integrantes: Robinson David Galvis, Carlos David Ramos Marquez, Gustavo Adolfo Arango Angulo.
Tutor: John Olarte Ramos.

## Cómo abrir el proyecto

1. Descomprime la carpeta.
2. Abre `index.html` con doble clic en cualquier navegador (Chrome, Firefox o Edge).

No necesitas un servidor ni instalar nada. Si usas la extensión **Live Server** de VS Code, también funciona.
En ese caso los datos se leen directamente de `data/noticias.json`.

> Para volver a los datos originales, borra el almacenamiento del sitio:
> F12 → Aplicación → Almacenamiento local → borrar las claves `pulsoia_noticias` y `pulsoia_favoritos`.
> También puedes escribir `restablecerDatos()` en la consola.

## Estructura

```
pulso-ia/
├── index.html          Inicio (hero, destacadas, ¿Por qué Pulso IA?, banner)
├── noticias.html       Listado con filtros y mini CRUD (crear / eliminar)
├── detalle.html        Detalle de una noticia (detalle.html?id=1)
├── favoritos.html      Noticias guardadas por el usuario
├── acerca.html         Acerca de y Glosario IA
├── contacto.html       Formulario con validaciones
├── css/
│   └── estilos.css     Hoja de estilos única (variables, componentes, responsive)
├── js/
│   ├── noticias-semilla.js  Copia del JSON como variable (para que funcione con doble clic)
│   ├── datos.js             Capa de datos: localStorage, CRUD y favoritos
│   ├── componentes.js       Header, footer, tarjeta de noticia y utilidades
│   ├── validacion.js        Validación reutilizable de formularios
│   ├── tema.js              Modo claro / oscuro (aporte propio)
│   ├── inicio.js | noticias.js | detalle.js | favoritos.js | contacto.js
├── data/
│   └── noticias.json   Semilla de datos (modelo de la Entrega 1)
└── img/                Imágenes de las noticias
```

## Correspondencia con la Entrega 1

| Vista (Entrega 1) | Funcionalidad implementada |
|---|---|
| 5.1 Inicio | Las 3 tarjetas se generan desde el JSON filtrando `destacada: true`. El corazón agrega a favoritos sin salir de la página. |
| 5.2 Listado | Renderizado dinámico, filtros por las 5 categorías, "+ Nueva noticia" (formulario en ventana modal con validación) y eliminación con confirmación. Todo se guarda en localStorage. |
| 5.3 Detalle | Lee el `?id=` de la URL, construye el artículo, tiene migas de pan, un botón de favoritos que cambia de estado, "Contactar al equipo" (llena el asunto automáticamente) y la caja de fuente original. Si la noticia no existe, muestra un mensaje. |
| 5.4 Favoritos | Lista leída de localStorage, contador en singular o plural, "Quitar de favoritos" con actualización inmediata y un estado vacío con invitación a explorar. |
| 5.5 Contacto | Campos obligatorios, validación del formato del correo, un error junto a cada campo y un mensaje de confirmación. |
| 5.6 Acerca de | Texto de presentación y Glosario IA (LLM, Prompt, Token, Alucinación). |
| 6. Modelo de datos | En la primera carga se lee `data/noticias.json` y se copia a localStorage. Desde ahí, leer, crear y eliminar se hace sobre localStorage. |

## Aporte propio: modo oscuro

Un botón con ícono de luna o sol en el encabezado cambia todo el sitio entre modo claro y oscuro.

- **Primera visita:** se respeta la preferencia del sistema operativo (`prefers-color-scheme`).
- **Elección del usuario:** se guarda en `localStorage` (clave `pulsoia_tema`) y se mantiene en todas las páginas y visitas.
- **Sin parpadeo:** `js/tema.js` se carga en el `<head>` para aplicar el tema antes de que el navegador pinte la página.
- **Cómo funciona:** el script pone `data-tema="oscuro"` en `<html>`, y `css/estilos.css` redefine las variables de color bajo `[data-tema="oscuro"]`. Como todos los componentes usan variables, no fue necesario modificarlos uno por uno.
- **Accesibilidad:** el botón cambia su `aria-label` ("Cambiar a modo oscuro" o "Cambiar a modo claro"). En modo oscuro el rojo de los textos se aclara (`--rojo-texto`) para cumplir el contraste mínimo de 4.5:1 (WCAG AA).

**Cómo probarlo:** toca la luna arriba a la derecha y navega a otra página: el tema se mantiene. Para volver a seguir la preferencia del sistema, borra la clave `pulsoia_tema` del almacenamiento local.

## Tecnologías

- **HTML5 semántico**: `header`, `nav`, `main`, `article`, `aside`, `time` y `dialog`.
- **CSS3**: variables, Flexbox, Grid, media queries (diseño responsive) y animaciones.
- **JavaScript**: manipulación del DOM, delegación de eventos, `localStorage`, `URLSearchParams`, `FormData`, expresiones regulares y `async/await`.
- **Google Fonts**: Libre Franklin e Inter. Sin conexión se usan fuentes del sistema.

## Imágenes

Fotografías de Unsplash (uso libre), las mismas de los mockups de la Entrega 1.
