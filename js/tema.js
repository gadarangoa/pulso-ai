/*
 * tema.js — Modo claro / oscuro (mejora de la entrega final)
 * ------------------------------------------------------------------
 * ¿Por qué este archivo se carga en el <head> y no al final del <body>?
 * Porque debe aplicar el tema ANTES de que el navegador pinte la página.
 * Si se cargara al final, la página se vería un instante en modo claro
 * y luego "parpadearía" a oscuro (efecto conocido como FOUC).
 *
 * Funcionamiento:
 *  1. Si el usuario ya eligió un tema, se usa el guardado en localStorage.
 *  2. Si no, se respeta la preferencia del sistema operativo
 *     (media query prefers-color-scheme).
 *  3. El tema se aplica con el atributo data-tema en <html>; el CSS
 *     redefine las variables de color bajo [data-tema="oscuro"].
 */

const CLAVE_TEMA = 'pulsoia_tema';

function leerTemaGuardado() {
  try {
    return localStorage.getItem(CLAVE_TEMA);   // 'claro', 'oscuro' o null
  } catch (error) {
    return null;                               // modo privado o almacenamiento bloqueado
  }
}

/** Tema que se debe mostrar: el elegido por el usuario o el del sistema. */
function obtenerTema() {
  const guardado = leerTemaGuardado();
  if (guardado === 'claro' || guardado === 'oscuro') return guardado;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
}

/** Cambia al tema contrario, lo guarda y devuelve el nuevo tema. */
function alternarTema() {
  const nuevo = obtenerTema() === 'oscuro' ? 'claro' : 'oscuro';
  try {
    localStorage.setItem(CLAVE_TEMA, nuevo);
  } catch (error) {
    console.warn('No se pudo guardar el tema:', error);
  }
  aplicarTema(nuevo);
  return nuevo;
}

// Se ejecuta de inmediato, mientras el navegador lee el <head>
aplicarTema(obtenerTema());

// Si el usuario no ha elegido tema y cambia el de su sistema operativo,
// la página lo sigue en vivo.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!leerTemaGuardado()) aplicarTema(obtenerTema());
});
