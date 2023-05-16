const productosLS = JSON.parse(localStorage.getItem('productos'));

const cardProducto = document.getElementById('cardProducto');

const filtro = document.getElementById('filtro');

const favoritosJSON = localStorage.getItem('favoritos');

//VERIFICA SI FAVORITOSJSON TIENE CONTENIDO, SI NO LO SETEA COMO UN ARRAY VACIO
let favoritos;
if (favoritosJSON) {
  favoritos = JSON.parse(favoritosJSON);
} else {
  favoritos = [];
}

// FILTRO POR CATEGORIAS DEL CATALOGO
filtro.addEventListener('change', function() {
  const opcionSeleccionada = filtro.value;
  mostrarProductos(opcionSeleccionada);
});


//FUNCION PARA MOSTRAR PRODUCTOS FILTRADOS

function mostrarProductos(categoria) {
  let productosFiltrados = [];
  if (categoria == 'todos') {
    productosFiltrados = productosLS;
  } else {
    productosFiltrados = productosLS.filter(producto => producto.category == categoria);
  }
  let cardHTML = "";
  productosFiltrados.forEach((producto) => {
    cardHTML += `
      <div class="col-lg-3 mt-3">
        <div class="card text-center mt-4 h-100" style="width: 100%;">
          <img src="${producto.url}" class="card-img-top" style="height: 35vh; object-fit:cover;" alt="...">
          <div class="card-body bg-body-tertiary">
            <h5 class="card-title">${producto.name}</h5>
            <h4 class="card-text">$${producto.price}</h4>
            <a href="detalle.html?name=${producto.name}&price=${producto.price}&url=${producto.url}&description=${producto.description}&categoria=${producto.category}&id=${producto.id}" class="btn btn-warning">Ver detalle</a><br>
            <button type="button" id="btnFav-${producto.id}" class="btn btn-outline-warning btn-sm mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
              Agregar a Favoritos
            </button>
          </div>
        </div>
      </div>
    `;
  });

  if (productosFiltrados.length == 0) {
    cardHTML = `
      <div class="alert alert-warning w-50 m-auto mt-3" role="alert">
        No hay productos disponibles.
      </div>
    `;
  }
  
  cardProducto.innerHTML = `<div class="container"><div class="row">${cardHTML}</div></div>`;
//LLAMO A LA FUNCION PARA AGREGAR A FAVORITOS
  productosFiltrados.forEach((producto) => {
    const btnFav = document.getElementById(`btnFav-${producto.id}`);
    btnFav.addEventListener('click', function () {
        agregarAFavoritos(producto);
    });
});
//FUNCION PARA AGREGAR A FAVORITOS 
function agregarAFavoritos(producto) {
  const existeProducto = favoritos.find((productoFav) => productoFav.id == producto.id)
  if(!existeProducto){
    favoritos.push(producto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    Swal.fire(
      '',
      'El producto fue agregado a tu lista de favoritos',
      'success'
    )
}else {
  Swal.fire(
    '',
    'El producto ya existe en tu lista de favoritos',
    'error'
  )
}
}
}

mostrarProductos('todos');