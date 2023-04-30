export function generarCodigoProducto() {
  let codigo = Math.trunc(Math.random() * 1000);
  return parseInt(codigo);
}
