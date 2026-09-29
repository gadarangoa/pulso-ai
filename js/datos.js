/*
 * datos.js — Capa de datos de Pulso IA
 * ------------------------------------------------------------------
 * Centraliza TODO el acceso a la información (noticias y favoritos).
 * Las páginas nunca tocan localStorage directamente: llaman a estas
 * funciones. Así, si mañana los datos vienen de un servidor, solo se
 * cambia este archivo (principio de separación de responsabilidades).
 *
 * Estrategia (definida en el Modelo de Datos de la Entrega 1):
 *  1. En la primera carga se lee data/noticias.json (la "semilla").
 *  2. Se copia a localStorage.
 *  3. Desde entonces, leer / crear / eliminar se hace sobre localStorage,
 *     porque el navegador no puede escribir en un archivo del servidor.
 */

const CLAVE_NOTICIAS = 'pulsoia_noticias';
const CLAVE_FAVORITOS = 'pulsoia_favoritos';

const CATEGORIAS = ['Tendencias', 'Comparativas', 'Aplicaciones', 'Herramientas', 'Ética y Regulación'];

/* ---------- Utilidades internas de localStorage ---------- */

// localStorage solo guarda texto; por eso usamos JSON.stringify / JSON.parse.
function leerLS(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto) : valorPorDefecto;
  } catch (error) {
    console.warn('No se pudo leer localStorage:', error);
    return valorPorDefecto;
  }
}

function guardarLS(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.warn('No se pudo guardar en localStorage:', error);
  }
}

/* ---------- Inicialización ---------- */

/**
 * Carga la semilla si localStorage está vacío.
 * Es async porque fetch() devuelve una Promesa.
 */
async function inicializarDatos() {
  if (localStorage.getItem(CLAVE_NOTICIAS)) return; // ya inicializado

  let noticias;
  try {
    // Con doble clic (file://) el navegador no permite fetch a archivos locales,
    // así que ni lo intentamos (evita un error en la consola).
    if (location.protocol === 'file:') throw new Error('Abierto como archivo local');
    // Funciona cuando el sitio se sirve por http:// (Live Server, Vercel...)
    const respuesta = await fetch('data/noticias.json');
    if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
    noticias = await respuesta.json();
  } catch (error) {
    // Con doble clic (file://) fetch falla: usamos la copia en JS.
    noticias = NOTICIAS_SEMILLA;
  }
  guardarLS(CLAVE_NOTICIAS, noticias);
}

/** Borra los cambios del usuario y vuelve a los datos originales. */
async function restablecerDatos() {
  localStorage.removeItem(CLAVE_NOTICIAS);
  localStorage.removeItem(CLAVE_FAVORITOS);
  await inicializarDatos();
}

/* ---------- Noticias (mini CRUD) ---------- */

/** READ: todas las noticias, de la más reciente a la más antigua. */
function obtenerNoticias() {
  const noticias = leerLS(CLAVE_NOTICIAS, []);
  // Las fechas ISO (AAAA-MM-DD) se pueden comparar como texto.
  return noticias.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** READ: una noticia por su id (o undefined si no existe). */
function obtenerNoticia(id) {
  return obtenerNoticias().find(n => n.id === Number(id));
}

function obtenerDestacadas() {
  return obtenerNoticias().filter(n => n.destacada).slice(0, 3);
}

/** CREATE: agrega una noticia nueva y la devuelve con su id. */
function crearNoticia(datos) {
  const noticias = leerLS(CLAVE_NOTICIAS, []);
  // Nuevo id = mayor id existente + 1
  const nuevoId = noticias.reduce((max, n) => Math.max(max, n.id), 0) + 1;
  const noticia = {
    id: nuevoId,
    nombre: datos.nombre,
    resumen: datos.resumen,
    contenido: datos.contenido,          // arreglo de párrafos
    imagen: datos.imagen || 'img/generica.jpg',
    categoria: datos.categoria,
    autor: datos.autor || 'Equipo Pulso IA',
    fecha: new Date().toISOString().slice(0, 10),
    destacada: false,
    fuente: datos.fuente || '',
    urlFuente: datos.urlFuente || ''
  };
  noticias.push(noticia);
  guardarLS(CLAVE_NOTICIAS, noticias);
  return noticia;
}

/** DELETE: elimina la noticia y también la quita de favoritos. */
function eliminarNoticia(id) {
  const noticias = leerLS(CLAVE_NOTICIAS, []).filter(n => n.id !== Number(id));
  guardarLS(CLAVE_NOTICIAS, noticias);
  guardarLS(CLAVE_FAVORITOS, obtenerIdsFavoritos().filter(f => f !== Number(id)));
}

/* ---------- Favoritos ---------- */
// Solo guardamos los ids: la noticia completa ya está en CLAVE_NOTICIAS.

function obtenerIdsFavoritos() {
  return leerLS(CLAVE_FAVORITOS, []);
}

function esFavorito(id) {
  return obtenerIdsFavoritos().includes(Number(id));
}

/** Agrega o quita de favoritos. Devuelve true si quedó como favorito. */
function alternarFavorito(id) {
  id = Number(id);
  let ids = obtenerIdsFavoritos();
  const yaEsta = ids.includes(id);
  ids = yaEsta ? ids.filter(f => f !== id) : [...ids, id];
  guardarLS(CLAVE_FAVORITOS, ids);
  return !yaEsta;
}

function obtenerNoticiasFavoritas() {
  const ids = obtenerIdsFavoritos();
  return obtenerNoticias().filter(n => ids.includes(n.id));
}
