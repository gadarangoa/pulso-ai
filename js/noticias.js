/*
 * noticias.js — Listado, filtros y mini CRUD (crear / eliminar)
 */

iniciarPagina(() => {
  const listado = document.getElementById('listado');
  const filtros = document.getElementById('filtros');
  const modal = document.getElementById('modalNoticia');
  const form = document.getElementById('formNoticia');

  // Estado de la vista: qué categoría está seleccionada.
  // Se puede abrir filtrada desde otra página: noticias.html?categoria=Tendencias
  let categoriaActual = leerParametro('categoria') || 'Todas';

  /* ---------- Renderizado ---------- */

  function renderListado() {
    const noticias = obtenerNoticias().filter(n =>
      categoriaActual === 'Todas' || n.categoria === categoriaActual);

    if (noticias.length === 0) {
      listado.innerHTML = `
        <div class="vacio">
          <div class="valor__icono" aria-hidden="true">🗂️</div>
          <h2>No hay noticias en esta categoría</h2>
          <p>Prueba con otro filtro o crea la primera noticia.</p>
        </div>`;
      return;
    }
    listado.innerHTML = noticias.map(n => crearTarjeta(n, { eliminar: true })).join('');
  }

  function marcarFiltroActivo() {
    filtros.querySelectorAll('.chip').forEach(chip => {
      const activo = chip.dataset.categoria === categoriaActual;
      chip.classList.toggle('activo', activo);
      chip.setAttribute('aria-pressed', activo);
    });
  }

  /* ---------- Filtros ---------- */

  filtros.addEventListener('click', evento => {
    const chip = evento.target.closest('.chip');
    if (!chip) return;
    categoriaActual = chip.dataset.categoria;
    marcarFiltroActivo();
    renderListado();
  });

  /* ---------- Acciones de las tarjetas (delegación) ---------- */

  listado.addEventListener('click', evento => {
    const boton = evento.target.closest('[data-accion]');
    if (!boton) return;
    const id = Number(boton.dataset.id);

    if (boton.dataset.accion === 'favorito') {
      const quedoFavorito = alternarFavorito(id);
      actualizarCorazon(boton, quedoFavorito);
      mostrarAviso(quedoFavorito ? '♥ Agregada a favoritos' : 'Quitada de favoritos');
    }

    if (boton.dataset.accion === 'eliminar') {
      const noticia = obtenerNoticia(id);
      // confirm() evita borrar por accidente (operación irreversible)
      if (confirm(`¿Eliminar la noticia "${noticia.nombre}"?\nEsta acción no se puede deshacer.`)) {
        eliminarNoticia(id);
        renderListado();
        mostrarAviso('Noticia eliminada');
      }
    }
  });

  /* ---------- Crear noticia (modal) ---------- */

  // Llenamos el <select> de categorías desde el arreglo de datos.js
  const selectCategoria = document.getElementById('nCategoria');
  CATEGORIAS.forEach(cat => selectCategoria.add(new Option(cat, cat)));

  const reglas = {
    nNombre: REGLAS.minimo(10),
    nCategoria: REGLAS.noVacio,
    nResumen: REGLAS.minimo(20),
    nContenido: REGLAS.minimo(50),
    nUrlFuente: REGLAS.url
  };
  activarValidacionEnVivo(reglas);

  function abrirModal() {
    form.reset();
    limpiarErrores(form);
    // Si hay un filtro activo, preseleccionamos esa categoría
    if (categoriaActual !== 'Todas') selectCategoria.value = categoriaActual;
    modal.showModal();                 // método nativo de <dialog>
    document.getElementById('nNombre').focus();
  }

  document.getElementById('btnNueva').addEventListener('click', abrirModal);
  document.getElementById('cerrarModal').addEventListener('click', () => modal.close());
  document.getElementById('cancelarModal').addEventListener('click', () => modal.close());
  // Cerrar al hacer clic fuera del cuadro (sobre el fondo oscuro)
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  form.addEventListener('submit', evento => {
    evento.preventDefault();           // evita que la página se recargue
    if (!validarFormulario(reglas)) return;

    // FormData lee todos los campos del formulario por su "name"
    const datos = Object.fromEntries(new FormData(form));
    // El contenido se guarda como arreglo de párrafos (igual que en el JSON)
    datos.contenido = datos.contenido.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    datos.nombre = datos.nombre.trim();
    datos.resumen = datos.resumen.trim();

    const nueva = crearNoticia(datos);
    modal.close();

    // Volvemos a "Todas" para que la noticia recién creada sea visible
    categoriaActual = 'Todas';
    marcarFiltroActivo();
    renderListado();
    mostrarAviso(`✔ Noticia "${nueva.nombre}" publicada`);
  });

  /* ---------- Arranque ---------- */
  marcarFiltroActivo();
  renderListado();
});
