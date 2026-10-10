/*
 * componentes.js — Componentes reutilizables de la interfaz
 * ------------------------------------------------------------------
 * El header, el footer y la tarjeta de noticia se repiten en varias
 * páginas. En lugar de copiar el mismo HTML seis veces, se generan
 * aquí con JavaScript (principio DRY: Don't Repeat Yourself).
 * Es la misma idea que luego haremos con componentes de Angular.
 */

/* ---------- Utilidades ---------- */

/**
 * Escapa caracteres especiales de HTML.
 * IMPORTANTE: las noticias creadas por el usuario se insertan con
 * innerHTML; sin esto alguien podría escribir <script> en el título
 * (ataque XSS).
 */
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto ?? '';
  return div.innerHTML;
}

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** '2026-08-28' → '28 ago 2026' (o '28 de agosto de 2026' si larga = true) */
function formatearFecha(iso, larga = false) {
  const [anio, mes, dia] = iso.split('-').map(Number);
  return larga
    ? `${dia} de ${MESES_LARGOS[mes - 1]} de ${anio}`
    : `${dia} ${MESES_CORTOS[mes - 1]} ${anio}`;
}

/** Lee un parámetro de la URL. Ej: detalle.html?id=3 → leerParametro('id') = '3' */
function leerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}

/* ---------- Íconos SVG (se reutilizan en varias vistas) ---------- */

const ICONOS = {
  corazon: `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4.7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>`,
  papelera: `<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>`,
  luna: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  sol: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`
};

/* ---------- Header ---------- */

const PAGINAS = [
  { id: 'inicio', texto: 'Inicio', url: 'index.html' },
  { id: 'noticias', texto: 'Noticias', url: 'noticias.html' },
  { id: 'favoritos', texto: 'Favoritos', url: 'favoritos.html' },
  { id: 'acerca', texto: 'Acerca de', url: 'acerca.html' },
  { id: 'contacto', texto: 'Contacto', url: 'contacto.html' }
];

function renderEncabezado() {
  const contenedor = document.getElementById('encabezado');
  if (!contenedor) return;
  // Cada página indica cuál es la activa con <body data-pagina="...">
  const activa = document.body.dataset.pagina;

  const enlaces = PAGINAS.map(p => `
    <li><a href="${p.url}" class="${p.id === activa ? 'activo' : ''}"
           ${p.id === activa ? 'aria-current="page"' : ''}>${p.texto}</a></li>`).join('');

  contenedor.innerHTML = `
    <div class="contenedor encabezado__interno">
      <a href="index.html" class="logo">Pulso <span>IA</span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú"
              aria-expanded="false" aria-controls="menuPrincipal">${ICONOS.menu}</button>
      <nav aria-label="Navegación principal">
        <ul class="nav" id="menuPrincipal">${enlaces}</ul>
      </nav>
      <button class="tema-toggle" id="temaToggle" type="button"></button>
    </div>`;

  // Menú hamburguesa en pantallas pequeñas
  const boton = document.getElementById('menuToggle');
  const menu = document.getElementById('menuPrincipal');
  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto);
  });

  // Botón de modo claro / oscuro (la lógica está en js/tema.js)
  const botonTema = document.getElementById('temaToggle');
  pintarBotonTema(botonTema);
  botonTema.addEventListener('click', () => {
    const tema = alternarTema();
    pintarBotonTema(botonTema);
    mostrarAviso(tema === 'oscuro' ? 'Modo oscuro activado' : 'Modo claro activado');
  });
}

/**
 * El botón muestra el ícono del tema al que se va a cambiar:
 * luna en modo claro, sol en modo oscuro.
 */
function pintarBotonTema(boton) {
  const oscuro = obtenerTema() === 'oscuro';
  const texto = oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  boton.innerHTML = oscuro ? ICONOS.sol : ICONOS.luna;
  boton.setAttribute('aria-label', texto);
  boton.title = texto;
}

/* ---------- Footer ---------- */

function renderPie() {
  const contenedor = document.getElementById('pie');
  if (!contenedor) return;
  const enlaces = PAGINAS.map(p => `<li><a href="${p.url}">${p.texto}</a></li>`).join('');
  contenedor.innerHTML = `
    <div class="contenedor pie__grid">
      <div>
        <a href="index.html" class="logo logo--claro">Pulso <span>IA</span></a>
        <p>Plataforma web de noticias sobre inteligencia artificial: tendencias,
           comparativas, aplicaciones, herramientas y regulación.</p>
      </div>
      <div>
        <h3>Navegación</h3>
        <ul>${enlaces}</ul>
      </div>
      <div>
        <h3>Contacto</h3>
        <ul>
          <li>✉ <a href="mailto:hola@pulsoia.com">hola@pulsoia.com</a></li>
          <li>📍 Colombia</li>
          <li>🕐 Respondemos en 24–48 horas</li>
        </ul>
      </div>
    </div>
    <div class="contenedor pie__legal">
      © ${new Date().getFullYear()} Pulso IA — Proyecto académico del módulo Front-end.
    </div>`;
}

/* ---------- Tarjeta de noticia ---------- */

/**
 * Devuelve el HTML de una tarjeta.
 * opciones.eliminar   → muestra el botón papelera (vista Noticias)
 * opciones.quitarFav  → muestra el botón "Quitar de favoritos" (vista Favoritos)
 * Los botones usan atributos data-* para que la página sepa sobre
 * qué noticia se hizo clic (delegación de eventos).
 */
function crearTarjeta(noticia, opciones = {}) {
  const fav = esFavorito(noticia.id);
  const url = `detalle.html?id=${noticia.id}`;
  return `
  <article class="tarjeta" data-id="${noticia.id}">
    <div class="tarjeta__media">
      <a href="${url}" tabindex="-1" aria-hidden="true">
        <img src="${escaparHTML(noticia.imagen)}" alt="" loading="lazy"
             onerror="this.src='img/generica.jpg'">
      </a>
      <div class="tarjeta__acciones">
        ${opciones.eliminar ? `
        <button class="icono-btn" data-accion="eliminar" data-id="${noticia.id}"
                aria-label="Eliminar noticia" title="Eliminar">${ICONOS.papelera}</button>` : ''}
        <button class="icono-btn icono-btn--fav ${fav ? 'activo' : ''}" data-accion="favorito"
                data-id="${noticia.id}" aria-pressed="${fav}"
                aria-label="${fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
                title="${fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${ICONOS.corazon}</button>
      </div>
    </div>
    <div class="tarjeta__cuerpo">
      <span class="categoria">${escaparHTML(noticia.categoria)}</span>
      <h3 class="tarjeta__titulo"><a href="${url}">${escaparHTML(noticia.nombre)}</a></h3>
      <p class="tarjeta__resumen">${escaparHTML(noticia.resumen)}</p>
      <div class="tarjeta__pie">
        <time datetime="${noticia.fecha}">${formatearFecha(noticia.fecha)}</time>
        <a href="${url}" class="ver-mas">Ver más →</a>
      </div>
      ${opciones.quitarFav ? `
      <button class="btn btn--peligro btn--bloque" data-accion="favorito" data-id="${noticia.id}">
        ✕ Quitar de favoritos</button>` : ''}
    </div>
  </article>`;
}

/**
 * Actualiza visualmente el corazón de una tarjeta sin volver a
 * dibujar toda la cuadrícula.
 */
function actualizarCorazon(boton, esFav) {
  boton.classList.toggle('activo', esFav);
  boton.setAttribute('aria-pressed', esFav);
  const texto = esFav ? 'Quitar de favoritos' : 'Agregar a favoritos';
  boton.setAttribute('aria-label', texto);
  boton.title = texto;
}

/* ---------- Aviso flotante (toast) ---------- */

let temporizadorAviso;
function mostrarAviso(mensaje) {
  let aviso = document.getElementById('aviso');
  if (!aviso) {
    aviso = document.createElement('div');
    aviso.id = 'aviso';
    aviso.className = 'aviso';
    aviso.setAttribute('role', 'status');   // lectores de pantalla lo anuncian
    document.body.appendChild(aviso);
  }
  aviso.textContent = mensaje;
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 2500);
}

/* ---------- Arranque común a todas las páginas ---------- */

/**
 * Cada página llama: iniciarPagina(miFuncion)
 * 1) dibuja header y footer, 2) asegura que los datos existan,
 * 3) ejecuta la lógica propia de la página.
 */
function iniciarPagina(logicaDePagina) {
  document.addEventListener('DOMContentLoaded', async () => {
    renderEncabezado();
    renderPie();
    await inicializarDatos();
    if (logicaDePagina) logicaDePagina();
  });
}
