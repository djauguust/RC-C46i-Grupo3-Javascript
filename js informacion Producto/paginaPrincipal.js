/* CODIGO QUE CREA CARDS PARA LA PAGINA PRINCIPAL
CON LOS PRODUCTOS AGREGADOS DESDE ADMINISTRADOR */

const productosLS = JSON.parse(localStorage.getItem('productos'));
console.log(productosLS)
const cardProducto = document.getElementById('cardProducto')

let cardHTML = ""; 

productosLS.forEach((producto) => {
  cardHTML += `
    <div class="col-lg-3 mt-3">
      <div class="card text-center mt-4 h-100" style="width: 100%;">
        <img src="${producto.url}" class="card-img-top" style="height: 35vh; object-fit:cover;" alt="...">
        <div class="card-body bg-body-tertiary">
          <h5 class="card-title">${producto.name}</h5>
          <h4 class="card-text">$${producto.price}</h4>
          <a href="detalle.html?name=${producto.name}&price=${producto.price}&url=${producto.url}&description=${producto.description}&categoria=${producto.category}&id=${producto.id}" class="btn btn-warning">Ver detalle</a>
        </div>
      </div>
    </div>
  `;
});

cardProducto.innerHTML = `<div class="container"><div class="row">${cardHTML}</div></div>`;