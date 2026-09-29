/*
 * inicio.js — Lógica de la página de Inicio
 * Muestra las 3 noticias marcadas como "destacada": true en el JSON
 * y permite agregarlas a favoritos sin salir de la página.
 */

iniciarPagina(() => {
  const contenedor = document.getElementById('destacadas');
  const destacadas = obtenerDestacadas();

  // map() convierte cada noticia en HTML; join('') une todo en un texto
  contenedor.innerHTML = destacadas.length
    ? destacadas.map(n => crearTarjeta(n)).join('')
    : '<p class="vacio">No hay noticias destacadas por ahora.</p>';

  /*
   * DELEGACIÓN DE EVENTOS: en vez de poner un listener en cada corazón,
   * ponemos UNO en el contenedor y preguntamos qué se tocó con closest().
   * Funciona incluso con tarjetas creadas después.
   */
  contenedor.addEventListener('click', evento => {
    const boton = evento.target.closest('[data-accion="favorito"]');
    if (!boton) return;
    const quedoFavorito = alternarFavorito(boton.dataset.id);
    actualizarCorazon(boton, quedoFavorito);
    mostrarAviso(quedoFavorito ? '♥ Agregada a favoritos' : 'Quitada de favoritos');
  });
});
