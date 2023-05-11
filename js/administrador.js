import { generarCodigoProducto } from "../js/codigoProducto.js";

let productos = [];
let usuarios = []

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

const obtenerProductos = localStorage.getItem("productos");
const obtenerUsuarios = localStorage.getItem("usuarios");

// Leo el LocalStorage, listo los productos y los usuarios
if (obtenerProductos) {
  productos = JSON.parse(obtenerProductos) || [];
  listarProductos();
}
if(obtenerUsuarios) {
  usuarios = JSON.parse(obtenerUsuarios) || [];
  /* listarUsuarios(); */
}

// Función return Categoria
function retornaCategoria(c) {
  for (const f of c) {
    if (f.checked) {
      return f.value;
    }
  }
}

// Validar form con JS
function validarFormularioJS(name, price, category, tags, url, description) {
  return (
    name != null &&
    name != "" &&
    price > 0 &&
    price != "" &&
    category != undefined &&
    tags != null &&
    tags != "" &&
    validarURL(url) &&
    description != null &&
    description != ""
  );
}

// Validar URL
function validarURL(miurl) {
  try {
    new URL(miurl);
    return true;
  } catch (err) {
    return false;
  }
}

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

  //agregar la funcion para actualizar la lista de productos.
  listarProductos();
});

// Función eliminar Producto
/* listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarproducto")) {
    const id = parseInt(e.target.dataset.id); // Obtenemos el id del producto a eliminar
    const index = productos.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      productos.splice(index, 1);
      //agregar la funcion para actualizar la lista de productos.
      listarProductos();
    }
  }
}); */

// Función Editar Usuario

// Función Eliminar Usuario

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
                <td class="align-middle">${producto.description}</td>
                <td class="align-middle">${producto.tags}</td>
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
                    type="button" 
                    class="btn btn-outline-danger mt-1 eliminarproducto" 
                    data-id="${producto.id}" 
                    data-bs-container="body" 
                    data-bs-toggle="popover" 
                    data-bs-placement="left" 
                    data-bs-content="Left popover"
                    ><i class="bi bi-trash3 eliminarproducto" data-id="${producto.id}"></i>                    
                  </button>
                  
    `;/* <i class="bi bi-trash3 eliminarproducto" data-id="${producto.id}"></i> */
    listaProductos.querySelector("tbody").appendChild(tr);
  });

  // funcion que guarda los productos en el local storage
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función Listar Usuarios
