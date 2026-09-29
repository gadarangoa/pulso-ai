/*
 * validacion.js — Funciones de validación reutilizables
 * Las usan el formulario de Contacto y el de Nueva noticia.
 *
 * ¿Por qué validar con JS si HTML tiene "required"? Porque así
 * controlamos el mensaje, el estilo y el momento en que aparece.
 * Por eso los <form> llevan el atributo "novalidate".
 */

const REGLAS = {
  // Expresión regular: texto@texto.texto, sin espacios
  correo: valor => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor),
  minimo: n => valor => valor.trim().length >= n,
  url: valor => valor === '' || /^https?:\/\/[^\s.]+\.[^\s]{2,}/.test(valor),
  noVacio: valor => valor.trim() !== ''
};

/**
 * Marca o desmarca un campo como inválido.
 * El CSS (.campo.invalido) se encarga de mostrar el mensaje de error.
 */
function marcarCampo(input, esValido) {
  const campo = input.closest('.campo');
  campo.classList.toggle('invalido', !esValido);
  input.setAttribute('aria-invalid', !esValido);
  // Asocia el mensaje de error al input para lectores de pantalla
  const error = campo.querySelector('.error');
  if (error) {
    if (!error.id) error.id = input.id + '-error';
    if (!esValido) input.setAttribute('aria-describedby', error.id);
    else input.removeAttribute('aria-describedby');
  }
  return esValido;
}

/**
 * Valida un formulario completo.
 * reglasPorCampo = { idDelInput: funcionQueDevuelveTrueSiEsValido }
 * Devuelve true si todos los campos son válidos.
 */
function validarFormulario(reglasPorCampo) {
  let primeroInvalido = null;
  let todoValido = true;

  for (const [id, regla] of Object.entries(reglasPorCampo)) {
    const input = document.getElementById(id);
    const valido = marcarCampo(input, regla(input.value));
    if (!valido) {
      todoValido = false;
      primeroInvalido = primeroInvalido || input;
    }
  }
  // Llevamos al usuario al primer error
  if (primeroInvalido) primeroInvalido.focus();
  return todoValido;
}

/**
 * Validación "en vivo": cuando el usuario sale de un campo (blur)
 * lo validamos; si ya tenía error, lo revalidamos mientras escribe.
 */
function activarValidacionEnVivo(reglasPorCampo) {
  for (const [id, regla] of Object.entries(reglasPorCampo)) {
    const input = document.getElementById(id);
    // Al salir del campo solo validamos si el usuario escribió algo:
    // los campos vacíos se señalan al enviar (así no "regañamos" antes de tiempo)
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') marcarCampo(input, regla(input.value));
    });
    input.addEventListener('input', () => {
      if (input.closest('.campo').classList.contains('invalido')) {
        marcarCampo(input, regla(input.value));
      }
    });
  }
}

/** Quita todas las marcas de error de un formulario. */
function limpiarErrores(form) {
  form.querySelectorAll('.campo.invalido').forEach(c => c.classList.remove('invalido'));
  form.querySelectorAll('[aria-invalid]').forEach(i => i.removeAttribute('aria-invalid'));
}
