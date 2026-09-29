/*
 * detalle.js — Vista de detalle de una noticia
 * Recibe el id por la URL (detalle.html?id=1), busca la noticia en
 * los datos y construye el artículo dinámicamente.
 */

iniciarPagina(() => {
  const articulo = document.getElementById('articulo');
  const id = leerParametro('id');
  const noticia = id ? obtenerNoticia(id) : undefined;

  // Caso de error: id inexistente o noticia eliminada
  if (!noticia) {
    document.title = 'Noticia no encontrada — Pulso IA';
    articulo.innerHTML = `
      <div class="vacio">
        <div class="valor__icono" aria-hidden="true">🔎</div>
        <h2>No encontramos esta noticia</h2>
        <p>Puede que haya sido eliminada o que el enlace no sea correcto.</p>
        <a href="noticias.html" class="btn btn--primario">Ver todas las noticias</a>
      </div>`;
    return;
  }

  document.title = `${noticia.nombre} — Pulso IA`;

  // Cada párrafo del arreglo "contenido" se convierte en un <p>
  const parrafos = noticia.contenido.map(p => `<p>${escaparHTML(p)}</p>`).join('');

  const asunto = encodeURIComponent(`Sobre la noticia: ${noticia.nombre}`);

  const cajaFuente = noticia.fuente ? `
    <aside class="fuente">
      Fuente original:
      ${noticia.urlFuente
        ? `<a href="${escaparHTML(noticia.urlFuente)}" target="_blank" rel="noopener noreferrer">${escaparHTML(noticia.fuente)}</a>`
        : `<strong>${escaparHTML(noticia.fuente)}</strong>`}
      — consultada en ${formatearFecha(noticia.fecha, true).replace(/^\d+ de /, '')}.
    </aside>` : '';

  articulo.innerHTML = `
    <nav class="migas" aria-label="Ruta de navegación">
      <a href="index.html">Inicio</a> /
      <a href="noticias.html">Noticias</a> /
      <span aria-current="page">${escaparHTML(noticia.nombre)}</span>
    </nav>

    <a class="categoria" style="text-decoration:none"
       href="noticias.html?categoria=${encodeURIComponent(noticia.categoria)}">${escaparHTML(noticia.categoria)}</a>
    <h1>${escaparHTML(noticia.nombre)}</h1>

    <div class="articulo__meta">
      <span>Por <strong>${escaparHTML(noticia.autor)}</strong></span>
      <span>📅 <time datetime="${noticia.fecha}">${formatearFecha(noticia.fecha, true)}</time></span>
      <span>📁 ${escaparHTML(noticia.categoria)}</span>
    </div>

    <img class="articulo__imagen" src="${escaparHTML(noticia.imagen)}"
         alt="Imagen ilustrativa de la noticia: ${escaparHTML(noticia.nombre)}"
         onerror="this.src='img/generica.jpg'">

    <div class="articulo__cuerpo">${parrafos}</div>

    <div class="articulo__acciones">
      <button class="btn btn--primario" id="btnFavorito"></button>
      <a class="btn btn--secundario" href="contacto.html?asunto=${asunto}">Contactar al equipo</a>
    </div>

    ${cajaFuente}`;

  /* ---------- Botón de favoritos ---------- */
  const btnFavorito = document.getElementById('btnFavorito');

  // Cambia texto y estilo según el estado actual
  function pintarBoton() {
    const fav = esFavorito(noticia.id);
    btnFavorito.classList.toggle('activo', fav);
    btnFavorito.setAttribute('aria-pressed', fav);
    btnFavorito.innerHTML = fav
      ? `${ICONOS.corazon} En favoritos`
      : `♡ Agregar a favoritos`;
  }

  btnFavorito.addEventListener('click', () => {
    const quedoFavorito = alternarFavorito(noticia.id);
    pintarBoton();
    mostrarAviso(quedoFavorito ? '♥ Agregada a favoritos' : 'Quitada de favoritos');
  });

  pintarBoton();
});
