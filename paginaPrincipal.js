//CODIGO QUE CREA LAS CARDS QUE SE MOSTRARAN EN LA PAGINA PRINCIPAL
const card = document.getElementById('cardProducto')
const obtenerProductos = JSON.parse(localStorage.getItem('productos'))
console.log(obtenerProductos)
obtenerProductos.forEach((producto) =>{
    card.innerHTML += `<div class="card text-center" style="width: 18rem;">
    <img src="${producto.url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <h3 class="card-text text-warning fw-semibold">$${producto.precio}<span class="fw-light text-dark fs-6">15%off</span></h3>
      <a href="detalle.html?nombre=${producto.nombre}" target="_blank" class="btn btn-warning">Ver detalle</a>
    </div>
  </div>`
  console.log(`el id es ${producto.id}`)
})