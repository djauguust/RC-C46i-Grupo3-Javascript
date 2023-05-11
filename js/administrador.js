import { generarCodigoProducto } from "../js/codigoProducto.js";

let productos = [];
let usuarios = [
  { usuario: "admin", email: "admin", contrasenia: "admin" },
  { usuario: "augusto", email: "augusto@gmail.com", contrasenia: "1234" },
];

// Obtener elementos del DOM
const listaProductos = document.getElementById("listaProductos");
const agregarProductoForm = document.getElementById("agregarProductosForm");
const nombreProducto = document.getElementById("nombre1");
const categoriaProducto = document.querySelectorAll('input[name="categoria"]');
const descripcionProducto = document.getElementById("descripcion1");
const etiquetasProducto = document.getElementById("etiquetas1");
const precioProducto = document.getElementById("precio1");
const urlProducto = document.getElementById("url1");
const promocionarProducto = document.getElementById("promocion1");
const addButton = document.getElementById("addProductButton");

const listaUsuarios = document.getElementById("listaUsuarios");
// hay que hacer un segundo formulario para editar usuarios!!!

const obtenerProductos = localStorage.getItem("productos");
const obtenerUsuarios = localStorage.getItem("usuarios");

// Leo el LocalStorage, listo los productos y los usuarios
if (obtenerProductos) {
  productos = JSON.parse(obtenerProductos) || [];
  listarProductos();
}
if (obtenerUsuarios) {
  usuarios = JSON.parse(obtenerUsuarios) || [];
  listarUsuarios();
}
//--

// Función return Categoria
function retornaCategoria(c) {
  for (const f of c) {
    if (f.checked) {
      return f.value;
    }
  }
}
//--

// Validar form con JS
function validarFormularioJS(name, price, category, tags, url, description) {
  return (
    name != null &&
    name != "" &&
    price > 0 &&
    price != null &&
    price != "" &&
    category != undefined &&
    tags != null &&
    tags != "" &&
    validarURL(url) &&
    description != null &&
    description != ""
  );
}
//--

// Validar URL
function validarURL(miurl) {
  try {
    new URL(miurl);
    return true;
  } catch (err) {
    return false;
  }
}
//--

// Función validación Bootstrap
function validacionBootstrap() {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}
//--

// Función Agregar/modificar Producto
addButton.addEventListener("click", (e) => {
  validacionBootstrap();

  const name = nombreProducto.value;
  const price = precioProducto.value;
  const category = retornaCategoria(categoriaProducto);
  const tags = etiquetasProducto.value;
  const url = urlProducto.value;
  const description = descripcionProducto.value;
  const promotion = promocionarProducto.checked;
  const mode = agregarProductoForm.dataset.mode;
  const editId = agregarProductoForm.dataset.editId;

  // Valido los datos que ingreso, si es falso, salgo sin hacer nada.
  if (!validarFormularioJS(name, price, category, tags, url, description)) {
    return;
  }

  if (mode === "add") {
    const id = generarCodigoProducto(productos);
    const producto = {
      id,
      name,
      category,
      description,
      tags,
      price,
      url,
      promotion,
    };
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  } else if (mode === "editar") {
    // Buscamos el indice del producto a editar
    const index = productos.findIndex((producto) => producto.id === editId);
    if (index !== -1) {
      // Si el producto existe
      const product = productos[index]; // Obtenemos el producto a editar del array
      product.name = name;
      product.price = price;
      product.description = description;
    }
  }

  console.log("pase por aqui");

  agregarProductoForm.dataset.mode = "add"; // Cambiamos el modo del boton
  addButton.textContent = "Agregar"; // Cambiamos el texto del boton

  listarProductos();
});
//--

// Función eliminar Producto
listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarproducto")) {
    const id = parseInt(e.target.dataset.id); // Obtenemos el id del producto a eliminar
    const toastTrigger = document.getElementById(id)
    const toastLiveExample = document.getElementById('liveToast'+id)

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    } 
  }

  if (e.target.classList.contains("eliminarproductoConfirmado")) {
    const id = parseInt(e.target.dataset.id); // Obtenemos el id del producto a eliminar
    const index = productos.findIndex((producto) => producto.id === id);

    if (index !== -1) {
      productos.splice(index, 1);
      //agregar la funcion para actualizar la lista de productos.
      listarProductos();
    }
  }
});
//--

// Función Editar Usuario
//--

// Función Eliminar Usuario
listaUsuarios.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarusuario")) {
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a eliminar
    const toastTrigger = document.getElementById(usuario);
    const toastLiveExample = document.getElementById('liveToast'+usuario);

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    } 
  }

  if (e.target.classList.contains("eliminarusuarioConfirmado")) {
    console.log(`1`)
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a eliminar
    const index = usuarios.findIndex((producto) => producto.usuario === usuario);
    console.log(usuario,index)
    if (index !== -1) {
      usuarios.splice(index, 1);
      //agregar la funcion para actualizar la lista de productos.
      listarUsuarios();
    }
  }
});
//--

// Función Listar Usuarios
function listarUsuarios() {
  const cantidadUsuarios = document.getElementById("cantidadUsuarios");
  cantidadUsuarios.innerHTML = `${usuarios.length}`;
  listaUsuarios.querySelector("tbody").innerHTML = ""; // Limpiamos el tbody

  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
              
                <td>${usuario.usuario}</td>
                <td>${usuario.email}</td>
                <td>*********</td>
                <td>
                  <button type="button" class="btn btn-outline-primary">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button 
                      id="${usuario.usuario}"
                      type="button" 
                      class="btn btn-outline-danger eliminarusuario" 
                      data-usuario="${usuario.usuario}">
                        <i class="bi bi-trash3 eliminarusuario" 
                        data-usuario="${usuario.usuario}"></i>
                  </button>
                </td>
                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                  <div id="liveToast${usuario.usuario}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                      <strong class="me-auto">Alerta de borrado</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                      ¿Desea eliminar <b>${usuario.usuario}</b>?
                      <br>
                      <button 
                      id="${usuario.usuario}"
                      type="button" 
                      class="btn btn-danger mt-3 eliminarusuarioConfirmado" 
                      data-usuario="${usuario.usuario}">
                        <i class="bi bi-trash3 eliminarusuarioConfirmado" data-id="${usuario.usuario}"></i> Eliminar                    
                      </button>
                    </div>
                  </div>
                </div>
              `;
    listaUsuarios.querySelector("tbody").appendChild(tr);
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
//--

// Función Listar Productos
function listarProductos() {
  const cantidadProductos = document.getElementById("cantidadProductos");
  cantidadProductos.innerHTML = `${productos.length}`;

  listaProductos.querySelector("tbody").innerHTML = ""; // Limpiamos el tbody

  productos.forEach((producto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
              <th scope="row" class="align-middle">${producto.id}</th>
                <td class="align-middle ${
                  producto.promotion ? `text-bg-warning` : ``
                }">${producto.name}${producto.promotion ? ` *` : ``}</td>
                <td class="align-middle">${producto.category}</td>
                <td class="align-middle text-break">${producto.description}</td>
                <td class="align-middle text-break">${producto.tags}</td>
                <td class="align-middle">$${producto.price}</td>
                <td class="align-middle">
                  <a href="${producto.url}" target="_blank">
                    <button type="button" class="btn btn-outline-secondary">
                      <i class="bi bi-link"></i>
                    </button>
                  </a>
                </td>
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-primary" data-id="${producto.id}">
                    <i class="bi bi-pencil" data-id="${producto.id}"></i>
                  </button>
                  <button 
                    id="${producto.id}"
                    type="button" 
                    class="btn btn-outline-danger mt-1 eliminarproducto" 
                    data-id="${producto.id}">
                    <i class="bi bi-trash3 eliminarproducto" data-id="${producto.id}"></i>                    
                  </button>
                  <div class="toast-container position-fixed bottom-0 end-0 p-3">
                  <div id="liveToast${producto.id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                      <strong class="me-auto">Alerta de borrado</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                      ¿Desea eliminar <b>${producto.name}</b>?
                      <br>
                      <button 
                      id="${producto.id}"
                      type="button" 
                      class="btn btn-danger mt-3 eliminarproductoConfirmado" 
                      data-id="${producto.id}">
                        <i class="bi bi-trash3 eliminarproductoConfirmado" data-id="${producto.id}"></i> Eliminar                    
                      </button>
                    </div>
                  </div>
                </div>`;
    listaProductos.querySelector("tbody").appendChild(tr);
  });

  // funcion que guarda los productos en el local storage
  localStorage.setItem("productos", JSON.stringify(productos));
}
//--

// Función Listar Usuarios
