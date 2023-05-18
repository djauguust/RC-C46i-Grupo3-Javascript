const favoritosHTML = document.getElementById('cardFavoritos')
const usuarioLogeadoActual = JSON.parse(localStorage.getItem('userLogin'));

if (usuarioLogeadoActual != "none"){
  const claveUsuario = `favoritos-${usuarioLogeadoActual}`;
  const favoritosUsuario = JSON.parse(localStorage.getItem(claveUsuario))

// CODIGO QUE MUESTRA LA LISTA DE FAVORITOS EN PANTALLA
let cardFavorito = "";
favoritosUsuario.forEach((producto) =>{
    cardFavorito += `
    <section style="background-color: #eee;">
    <div class="container p-1">
    <div class="row justify-content-center mb-3">
    <div class="col-md-12 col-xl-10">
      <div class="card shadow-0 border rounded-3">
    <div class="card-body">
    <div class="row">
      <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
        <div class="bg-image hover-zoom ripple rounded ripple-surface">
          <img src="${producto.url}"
            class="w-100" />
          <a href="#!">
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-xl-6">
        <h5>${producto.name}</h5>
        <div class="d-flex flex-row">
          <div class="text-danger mb-1 me-2">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <span>cód #${producto.id}</span>
        </div>
        <div class="mt-1 mb-0 text-muted small">
          <span>${producto.tags}</span>
          <span class="text-primary"> • </span>
        </div>
        <p class="text-truncate mb-4 mb-md-0">
        ${producto.description}
        </p>
      </div>
      <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
        <div class="d-flex flex-row align-items-center mb-1">
          <h4 class="mb-1 me-1">$${producto.price}</h4>
          <span class="text-danger"><s>$${parseInt(producto.price) + parseInt(producto.price) * 0.2}</s></span>
        </div>
        <h6 class="text-success">Free shipping</h6>
        <div class="d-flex flex-column mt-4">
          <!--botones-->
          <a class="btn btn-outline-warning btn-sm mt-2" type="button" href="detalle.html?name=${producto.name}&price=${producto.price}&url=${producto.url}&description=${producto.description}&categoria=${producto.category}&id=${producto.id}">
              MÁS DETALLES
              </a>
              <a class="btn btn-warning btn-sm mt-2" type="button" href="error404.html"> AGREGAR AL CARRITO</a>
          <button type="button" class="btn btn-danger btn-sm mt-2 boton-eliminar" id="${producto.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak" viewBox="0 0 16 16">
                  <path d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38.094 38.094 0 0 0 .867-.59Zm-.303-1.01-.971-3.237 1.74-2.608a1 1 0 0 0 .103-.906l-1.3-3.468 1.45-1.813c1.861-.948 4.446.002 5.197 2.11.691 1.94-.055 5.521-6.219 9.922Zm-1.25 1.137a36.027 36.027 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3 1.815 4.537Zm-2.3-3.06-.442-1.106a1 1 0 0 1 .034-.818l1.305-2.61L4.564 3.35a1 1 0 0 1 .168-.991l1.032-1.24c-1.688-.449-3.7.398-4.456 2.128-.711 1.627-.413 4.55 3.706 8.229Z"></path>
              </svg>
              ELIMINAR
            </button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
    `
})
favoritosHTML.innerHTML = `
${cardFavorito}
    `;

    // EVENTO PARA EL BOTON ELIMINAR DE FAVORITOS
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('boton-eliminar')) {
          const productoId = event.target.id;
          const favoritosUsuario = JSON.parse(localStorage.getItem(claveUsuario));
          const nuevosFavoritos = favoritosUsuario.filter(productofav => productofav.id != productoId);
      
          Swal.fire({
            title: 'Estas seguro?',
            text: "Vas a eliminar el producto de tu lista de favoritos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem(claveUsuario, JSON.stringify(nuevosFavoritos));
      
              Swal.fire(
                'Eliminado!',
                'Tu producto fue eliminado de tus favoritos.',
                'success'
              ).then(() => {
                location.reload();
              });
            } 
          });
        }
      });
      if (favoritosUsuario.length == 0){
        favoritosHTML.innerHTML = `<div class="alert alert-warning w-50 m-auto mt-3 mb-3" role="alert">
        No tienes productos en favoritos.
      </div>`
      }
    }
    if(usuarioLogeadoActual == "none"){
      favoritosHTML.innerHTML = `<div class="alert alert-warning w-50 m-auto mt-3 mb-3" role="alert">
      No tienes productos en favoritos.
    </div>`
    }
