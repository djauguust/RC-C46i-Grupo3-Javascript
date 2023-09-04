export function generarCodigoProducto(lista) {
  let bandera = 0;
  let codigo;
  while (bandera == 0) {
    codigo = Math.trunc(Math.random() * 1000);
    if (lista.indexOf(codigo) == -1) {
      bandera = 1;
    }
  }
  return parseInt(codigo);
}

export function CartelGigante(mensaje2, tipo) {
  // tipo debe ser: error o success
  let titulo = ``;
  if (tipo === `error`) {
    titulo = `¡Error!`;
  } else {
    titulo = `¡Listo!`;
  }
  Swal.fire({
    title: `${titulo}`,
    text: `${mensaje2}`,
    icon: `${tipo}`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}
