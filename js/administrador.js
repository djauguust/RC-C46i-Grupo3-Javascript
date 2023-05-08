
import { generarCodigoProducto } from '../js/codigoProducto.js';

let productos = [];

// Obtener elementos del DOM
const agregarProductoForm = document.getElementById("agregarProductosForm");
const nombreProducto = document.getElementById("nombre1");
const categoriaProducto = document.querySelectorAll('input[name="categoria"]');
const descripcionProducto = document.getElementById("descripcion1");
const etiquetasProducto = document.getElementById("etiquetas1");
const precioProducto = document.getElementById("precio1");
const urlProducto = document.getElementById("url1");
const promocionarProducto = document.getElementById("promocion1");
const addButton = document.getElementById("addProductButton");

// Función return Categoria

function retornaCategoria(c){
  for (const f of c) {
    if (f.checked) {
      return f.value
    }
  }
}

// Función Agregar/modificar Producto

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nombreProducto.value;
    const price = precioProducto.value;
    const category = retornaCategoria(categoriaProducto);
    const tags = etiquetasProducto.value;
    const url = urlProducto.value;
    const promotion = promocionarProducto.checked;
    const description = descripcionProducto.value;
    const mode = agregarProductoForm.dataset.mode;
    const editId = agregarProductoForm.dataset.editId;
    
    if (mode === "add") {
      const id = generarCodigoProducto(productos);
      const producto = { id, name, category, description, tags, price, url, promotion};
      productos.push(producto);
      console.log("agregue el producto");
       console.log(productos)
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
  
    /* console.log("pase por aqui");
    agregarProductoForm.reset(); // Reseteamos el formulario
    agregarProductoForm.dataset.mode = "add"; // Cambiamos el modo del boton
    addButton.textContent = "Agregar"; // Cambiamos el texto del boton
   */
    //agregar la funcion para actualizar la lista de productos.
    // mostrarProductos();
  });

// Función eliminar Producto

// Función Editar Usuario

// Función Eliminar Usuario