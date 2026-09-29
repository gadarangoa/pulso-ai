/*
 * contacto.js — Validación del formulario de contacto
 * Reglas (Entrega 1, punto 5.5):
 *  - Nombre, correo y mensaje son obligatorios.
 *  - El correo debe tener un formato válido.
 *  - Si falla: mensaje de error junto a cada campo.
 *  - Si es válido: mensaje de confirmación arriba del formulario.
 */

iniciarPagina(() => {
  const form = document.getElementById('formContacto');
  const exito = document.getElementById('exito');

  // Si venimos desde una noticia (contacto.html?asunto=...), llenamos el asunto
  const asunto = leerParametro('asunto');
  if (asunto) document.getElementById('asunto').value = asunto;

  const reglas = {
    nombre: REGLAS.minimo(3),
    correo: REGLAS.correo,
    mensaje: REGLAS.minimo(10)
  };
  activarValidacionEnVivo(reglas);

  form.addEventListener('submit', evento => {
    evento.preventDefault();          // no recargar la página
    exito.hidden = true;

    if (!validarFormulario(reglas)) return;

    // No hay servidor todavía: simulamos el envío mostrando los datos en consola
    const datos = Object.fromEntries(new FormData(form));
    console.log('Mensaje de contacto (simulado):', datos);

    exito.hidden = false;
    form.reset();
    limpiarErrores(form);
    exito.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
