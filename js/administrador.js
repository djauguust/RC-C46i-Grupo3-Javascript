import { generarCodigoProducto } from "../js/codigoProducto.js";

let productos = [];

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

if (obtenerProductos) {
  productos = JSON.parse(obtenerProductos);
  listarProductos();
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
    /* validarURL(url) && */
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

// Función Agregar/modificar Producto
addButton.addEventListener("click", (e) => {
  const name = nombreProducto.value;
  const price = precioProducto.value;
  const category = retornaCategoria(categoriaProducto);
  const tags = etiquetasProducto.value;
  const url = urlProducto.value;
  const description = descripcionProducto.value;
  const promotion = promocionarProducto.checked;
  const mode = agregarProductoForm.dataset.mode;
  const editId = agregarProductoForm.dataset.editId;

  /* if (!validarFormularioJS(name, price, category, tags, url, description)) {
    return;
  } */

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
    const index = productos.findIndex((producto) => producto.id === editId); // Buscamos el indice del producto a editar
    if (index !== -1) {
      // Si el producto existe
      const product = productos[index]; // Obtenemos el producto a editar del array
      product.name = name;
      product.price = price;
      product.description = description;
    }
  }

  console.log("pase por aqui");
  /* agregarProductoForm.reset(); // Reseteamos el formulario */
  agregarProductoForm.dataset.mode = "add"; // Cambiamos el modo del boton
  addButton.textContent = "Agregar"; // Cambiamos el texto del boton

  //agregar la funcion para actualizar la lista de productos.
  listarProductos();
});

// Función eliminar Producto

// Función Editar Usuario

// Función Eliminar Usuario

// Función Listar Productos

function listarProductos() {
  const cantidadProductos = document.getElementById("cantidadProductos");
  cantidadProductos.innerHTML = `${productos.length}`;

  listaProductos.querySelector("tbody").innerHTML = ""; // Limpiamos el tbody
  console.log(productos, "productos");
  productos.forEach((producto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <th scope="row">${producto.id}</th>
                <td>${producto.name}</td>
                <td>${producto.category}</td>
                <td>${producto.description}</td>
                <td>${producto.tags}</td>
                <td>$${producto.price}</td>
                <td>
                  <button type="button" class="btn btn-outline-secondary">
                    <i class="bi bi-link"></i>
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-outline-primary">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-trash3"></i>
                  </button>
    `;
    listaProductos.querySelector("tbody").appendChild(tr);
  });

  // funcion que guarda los productos en el local storage
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función Listar Usuarios
