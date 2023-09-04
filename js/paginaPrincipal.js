const productosLS = JSON.parse(localStorage.getItem('productos'));

const cardProducto = document.getElementById('cardProducto');

const filtro = document.getElementById('filtro');


// FILTRO POR CATEGORIAS DEL CATALOGO
filtro.addEventListener('change', function () {
  const opcionSeleccionada = filtro.value;
  mostrarProductos(opcionSeleccionada);
});

//FILTRO POR TEXTO 

buscador.addEventListener('input', function () {
  const textoBusqueda = buscador.value.toLowerCase();
  const opcionSeleccionada = filtro.value;
  mostrarProductos(opcionSeleccionada, textoBusqueda);
});

//FUNCION PARA MOSTRAR PRODUCTOS FILTRADOS

function mostrarProductos(categoria, textoBusqueda = '') {
  let productosFiltrados = [];
  if (categoria == 'todos') {
    productosFiltrados = productosLS;
  } else {
    productosFiltrados = productosLS.filter(producto => producto.category == categoria);
  }

  productosFiltrados = productosFiltrados.filter(producto => producto.name.toLowerCase().includes(textoBusqueda));

  let cardHTML = "";
  productosFiltrados.forEach((producto) => {
    cardHTML += `
      <div class="col-lg-3 mt-3">
        <div class="card text-center mt-4 h-100" style="width: 100%;">
          <img src="${producto.url}" class="card-img-top" style="height: 35vh; object-fit:cover;" alt="...">
          <div class="card-body bg-body-tertiary">
            <h5 class="card-title">${producto.name}</h5>
            <h4 class="card-text">$${producto.price}</h4>
            <a href="detalle.html?name=${producto.name}&price=${producto.price}&url=${producto.url}&description=${producto.description}&categoria=${producto.category}&id=${producto.id}" class="btn btn-outline-warning ">Ver detalle</a><br>
            <button type="button" id="btnFav-${producto.id}" class="btn btn-warning btn-sm mt-2">
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
      const usuarioLogeado = JSON.parse(localStorage.getItem('userLogin'))
      if (usuarioLogeado[0] != "none") {
        agregarAFavoritos(producto);
      } else {
        let timerInterval
        Swal.fire({
          title: 'Debe estar logeado para realizar esta accion.',
          html: 'Sera redireccionado',
          timer: 5000,
          timerProgressBar: true,
          showCancelButton: true,
          cancelButtonText : 'Cancelar',
          customClass: {
            cancelButton : 'btn btn-danger'
          },
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
            window.location.href = 'login.html'
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('I was closed by the cancel button');
          }
        })

      }
    });
  });
  //FUNCION PARA AGREGAR A FAVORITOS 
  function agregarAFavoritos(producto) {
    const usuarioLogeado = JSON.parse(localStorage.getItem('userLogin'));
    if (usuarioLogeado != "none") {
      const claveUsuario = `favoritos-${usuarioLogeado}`;
      let favoritosUsuario = localStorage.getItem(claveUsuario);
  
      if (!favoritosUsuario) {
        favoritosUsuario = [];
      } else {
        favoritosUsuario = JSON.parse(favoritosUsuario);
      }
  

    const existeProducto = favoritosUsuario.find((productoFav) => productoFav.id == producto.id)
    if (!existeProducto) {
      favoritosUsuario.push(producto);
      localStorage.setItem(claveUsuario, JSON.stringify(favoritosUsuario));
      Swal.fire(
        '',
        'El producto fue agregado a tu lista de favoritos',
        'success'
      )
    } else {
      Swal.fire(
        '',
        'El producto ya existe en tu lista de favoritos',
        'error'
      )
    }
  }
}
}
mostrarProductos('todos');