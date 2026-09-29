/*
 * favoritos.js — Lista personalizada del usuario (leída de localStorage)
 */

iniciarPagina(() => {
  const cuadricula = document.getElementById('favoritos');
  const contador = document.getElementById('contador');

  function renderFavoritos() {
    const favoritas = obtenerNoticiasFavoritas();
    const total = favoritas.length;

    // Estado vacío: invitación a explorar las noticias
    if (total === 0) {
      contador.hidden = true;
      cuadricula.innerHTML = `
        <div class="vacio">
          <div class="valor__icono" aria-hidden="true">♡</div>
          <h2>Aún no tienes noticias guardadas</h2>
          <p>Toca el corazón de cualquier noticia para guardarla aquí.</p>
          <a href="noticias.html" class="btn btn--primario">Explorar noticias</a>
        </div>`;
      return;
    }

    contador.hidden = false;
    // Operador ternario para singular / plural
    contador.textContent = `♥ Tienes ${total} ${total === 1 ? 'noticia guardada' : 'noticias guardadas'} en favoritos.`;
    cuadricula.innerHTML = favoritas.map(n => crearTarjeta(n, { quitarFav: true })).join('');
  }

  // Tanto el corazón como el botón "Quitar" tienen data-accion="favorito"
  cuadricula.addEventListener('click', evento => {
    const boton = evento.target.closest('[data-accion="favorito"]');
    if (!boton) return;
    alternarFavorito(boton.dataset.id);   // aquí siempre la quita
    renderFavoritos();                     // la vista se actualiza de inmediato
    mostrarAviso('Quitada de favoritos');
  });

  renderFavoritos();
});
