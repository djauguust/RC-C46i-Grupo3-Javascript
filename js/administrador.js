import { generarCodigoProducto } from "../js/codigoProducto.js";

let productos = [];
let usuarios = [];

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
const btnCancelar = document.getElementById("cancelarEdicion");


const listaUsuarios = document.getElementById("listaUsuarios");
// hay que hacer un segundo formulario para editar usuarios!!!

const obtenerProductos = localStorage.getItem("productos");
const obtenerUsuarios = localStorage.getItem("usuarios");
//--

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
  const editId = parseInt(agregarProductoForm.dataset.editId);

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
    const index = parseInt(
      productos.findIndex((producto) => producto.id === editId)
    );

    if (index !== -1) {
      // Si el producto existe
      const product = productos[index]; // Obtenemos el producto a editar del array
      product.name = name;
      product.price = price;
      product.description = description;
      product.url = url;
      product.tags = tags;
      product.promotion = promotion;
      product.category = category;
    }


    // Sacamos el botón Cancelar
    btnCancelar.className = "d-none";
    //-- /Sacamos el botón Cancelar
  }

  agregarProductoForm.dataset.mode = "add"; // Cambiamos el modo del boton
  addButton.textContent = "Agregar"; // Cambiamos el texto del boton
  agregarProductoForm.reset();

  listarProductos();
});
//--

// Función que cuando apretamos el botón cancelar de "modificar producto" nos limpia el formulario
btnCancelar.addEventListener("click", (e) => {
  agregarProductoForm.dataset.mode = "add"; // Cambiamos el modo del boton
  addButton.textContent = "Agregar"; // Cambiamos el texto del boton
  agregarProductoForm.reset();
  btnCancelar.className = "d-none";
});
//-- /Función que cuando apretamos el botón cancelar de "modificar producto" nos limpia el formulario

// Función eliminar Producto
listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarproducto")) {
    const id = parseInt(e.target.dataset.id); // Obtenemos el id del producto a eliminar

    // Activación del toast por Bootstrap
    const toastTrigger = document.getElementById(id);
    const toastLiveExample = document.getElementById("liveToast" + id);

    if (toastTrigger) {
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
      });
    }
    // Fin Activación del toast por Bootstrap
  }

  // Segmento que confirma el borrado de producto
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

// Función Editar Producto
listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("editar")) {
    // Si el elemento clickeado tiene la clase editar
    const id = parseInt(e.target.dataset.id); // Obtenemos el id del producto a editar
    const producto = productos.find((producto) => producto.id === id); // Buscamos el producto a editar

    if (producto) {
      document.getElementById("nombre1").value = producto.name; // Seteamos el valor del input nombre
      document.getElementById("precio1").value = producto.price; // Seteamos el valor del input precio
      document.getElementById("descripcion1").value = producto.description; // Seteamos el valor del input descripcion
      document.getElementById("etiquetas1").value = producto.tags;
      document.getElementById("url1").value = producto.url;
      document.getElementById(producto.category).checked = true;
      document.getElementById("promocion1").checked = producto.promotion;

      agregarProductoForm.dataset.mode = "editar"; // Cambiamos el modo del formulario
      agregarProductoForm.dataset.editId = id; // Seteamos el id del producto a editar
      addButton.textContent = "Editar"; // Cambiamos el texto del boton
    }

    // Aparece el botón cancelar
    btnCancelar.className = "d-block d-grid gap-2 col-4 mx-auto";
    //-- /Aparece el botón cancelar
  }
});
//--

// Función Editar Usuario
listaUsuarios.addEventListener("click", (e) => {
  // Cargar Modal con información a modificar
  if (e.target.classList.contains("editarUsuario")) {
    // Si clickeo modificar, debo acceder al modal
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a modificar
    const user = usuarios.find((p) => p.usuario === usuario); // Traigo el usuario
    const index = usuarios.findIndex((p) => p.usuario === usuario); // Traigo su ubicación
    const formEditUser = document.getElementById("editarUsuarioForm" + index);

    if (user) {
      // Si el usuario existe
      formEditUser.reset();
      document.getElementById("email" + index).value = user.email; // Sólo cargo el email
    }
  }

  // "Guardar Cambios"
  if (e.target.classList.contains("guardarCambios")) {
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a modificar
    const index = usuarios.findIndex((p) => p.usuario === usuario); // Traigo su ubicación
    const emailNuevo = document.getElementById("email" + index).value;
    const contraseniaNueva = document.getElementById(
      "contrasenia" + index
    ).value;
    const contraseniaNueva2 = document.getElementById(
      "repitecontrasenia" + index
    ).value;
    const formEditUser = document.getElementById("editarUsuarioForm" + index);

    // Las contraseñas no son validadas
    let regPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (!regPass.test(contraseniaNueva)) {
      CartelDeError(index, "La contraseña debe ser más segura, debe contener al menos 8 caracteres alfanumericos entre minúsculas, mayúsculas y números", "danger");
    }

    // Las contraseñas no coinciden
    if (contraseniaNueva !== contraseniaNueva2) {
      CartelDeError(index, "Las contraseñas no coinciden", "danger");
    }

    // Una vez validado los cambios, guardo las modificaciones realizadas:
    if (
      index != -1 &&
      contraseniaNueva === contraseniaNueva2 &&
      contraseniaNueva.length > 8
    ) {
      console.log(`1`);
      const userEdit = usuarios[index];
      userEdit.email = emailNuevo;
      userEdit.contrasenia = contraseniaNueva;
      formEditUser.reset();
      listarUsuarios();
      /* let btn = document.getElementById("SaveChanges"+index);
      btn.setAttribute("data-bs-dismiss","modal") */
      /* let shadow = document.getElementsByClassName("modal-backdrop");
      shadow.className = "d-none"; */
      window.location.href = "./administrador.html";
    }
  }
});
//--

// Función Cartelito para mostrar errores en Editar Usuario
function CartelDeError(index, message, type) {
  const alertPlaceholder = document.getElementById(
    "alertaDeEditarUsuario" + index
  );
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  appendAlert(message, type);
}
//--

// Función Eliminar Usuario
listaUsuarios.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarusuario")) {
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a eliminar
    const toastTrigger = document.getElementById(`primerEliminar` + usuario);
    const toastLiveExample = document.getElementById("liveToast" + usuario);
    if (toastTrigger) {
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
      });
    }
  }

  // Segmento que confirma el borrado del Usuario
  if (e.target.classList.contains("eliminarusuarioConfirmado")) {
    const usuario = e.target.dataset.usuario; // Obtenemos el usuario a eliminar
    const index = usuarios.findIndex((p) => p.usuario === usuario);

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

  usuarios.forEach((usuario, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
              
                <td class="align-middle">${usuario.usuario}</td>
                <td class="align-middle">${usuario.email}</td>
                <td class="align-middle">*********</td>
                <td>
                ${
                  usuario.usuario === `admin`
                    ? ``
                    : `
                  <button 
                    type="button" 
                    class="btn btn-outline-primary editarUsuario" 
                    data-bs-toggle="modal" 
                    data-bs-target="#usuario${index}"
                    data-usuario="${usuario.usuario}"
                  >
                      <i 
                        class="bi bi-pencil editarUsuario"
                        data-usuario="${usuario.usuario}"
                      ></i>
                  </button>
                  <button 
                      id="primerEliminar${usuario.usuario}"
                      type="button" 
                      class="btn btn-outline-danger eliminarusuario" 
                      data-usuario="${usuario.usuario}">
                        <i class="bi bi-trash3 eliminarusuario" 
                        data-usuario="${usuario.usuario}"></i>
                  </button>
                `
                }
                
                <!-- Modal -->
                <div 
                  class="modal fade" 
                  id="usuario${index}" 
                  tabindex="-1" 
                  aria-labelledby="exampleModalLabel" 
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form
                          id="editarUsuarioForm${index}"
                          data-mode="add"
                          class="needs-validation"
                          novalidate
                        >
                          <fieldset disabled>
                            <div class="mb-3">
                              <label for="usuario${index}">
                                <p class="fs-6">Usuario</p>
                              </label>
                              <input
                                class="form-control"
                                type="text"                            
                                id="usuario${index}"
                                placeholder="${usuario.usuario}"
                                required
                              />
                              <div class="valid-feedback">¡Luce bien!</div>
                              <div class="invalid-feedback">Por favor elige un usuario válido.</div>
                            </div>
                          </fieldset>
                          <div class="mb-3">
                            <label for="email${index}">
                              <p class="fs-6">E-mail</p>
                            </label>
                            <input
                              class="form-control"
                              type="email"                            
                              id="email${index}"
                              required
                            />
                            <div class="valid-feedback">¡Luce bien!</div>
                            <div class="invalid-feedback">Por favor elige un email válido.</div>
                          </div>
                          <div class="mb-3">
                            <label for="contrasenia${index}">
                              <p class="fs-6">Contraseña</p>
                            </label>
                            <input
                              class="form-control"
                              type="password"                            
                              id="contrasenia${index}"
                              required
                            />
                            <div class="valid-feedback">¡Luce bien!</div>
                            <div class="invalid-feedback">Por favor elige una contraseña válida.</div>
                          </div>
                          <div class="mb-3">
                            <label for="repitecontrasenia${index}">
                              <p class="fs-6">Repita la Contraseña</p>
                            </label>
                            <input
                              class="form-control"
                              type="password"                            
                              id="repitecontrasenia${index}"
                              required
                            />
                            <div class="valid-feedback">¡Luce bien!</div>
                            <div class="invalid-feedback">Por favor elige una contraseña válida.</div>
                          </div>
                        </form>
                        <div id="alertaDeEditarUsuario${index}"></div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                          type="button" 
                          class="btn btn-success guardarCambios" 
                          data-usuario="${usuario.usuario}"
                        >
                            Guardar Cambios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Toast -->
                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                  <div id="liveToast${
                    usuario.usuario
                  }" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
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
                        <i class="bi bi-trash3 eliminarusuarioConfirmado" data-id="${
                          usuario.usuario
                        }"></i> Eliminar                    
                      </button>
                    </div>
                  </div>
                </div>
                </td>
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
                  <button type="button" class="btn btn-outline-primary editar" data-id="${
                    producto.id
                  }">
                    <i class="bi bi-pencil editar" data-id="${producto.id}"></i>
                  </button>
                  <button 
                    id="${producto.id}"
                    type="button" 
                    class="btn btn-outline-danger mt-1 eliminarproducto" 
                    data-id="${producto.id}">
                    <i class="bi bi-trash3 eliminarproducto" data-id="${
                      producto.id
                    }"></i>                    
                  </button>
                  <div class="toast-container position-fixed bottom-0 end-0 p-3">
                  <div id="liveToast${
                    producto.id
                  }" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
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
                        <i class="bi bi-trash3 eliminarproductoConfirmado" data-id="${
                          producto.id
                        }"></i> Eliminar                    
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

