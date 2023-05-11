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