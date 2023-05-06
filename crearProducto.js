let arrayProductos = [] //array donde se guardan los productos  

//obtengo todos los elementos del formulario menos la categoria
const nombreProducto = document.getElementById('nombre1')
const descripcionProducto = document.getElementById('descripcion1')
const etiquetasProducto = document.getElementById('etiquetas1')
const precioProducto = document.getElementById('precio1')
const urlProducto = document.getElementById('url1')
const boton = document.getElementById('agregar1')
const formularioProductos = document.getElementById('formulario1')

//funcion para agregar productos
boton.addEventListener('click', (e) => {
    e.preventDefault();

    //obtengo la categoria seleccionada en el checkbox
    const categorias = document.querySelectorAll('input[name="categoria"]')
    let valorseleccionado
    categorias.forEach((categoria) => {
        if (categoria.checked) {
            valorseleccionado = categoria.id;
        }
    }
    )
    // creo el objeto del producto
    const productoNuevo = {
        nombre: nombreProducto.value,
        descripcion: descripcionProducto.value,
        etiquetas: etiquetasProducto.value,
        precio: precioProducto.value,
        url: urlProducto.value,
        categoria: valorseleccionado,
    }
    // lo pusheo al array y lo subo al localstorage
    arrayProductos.push(productoNuevo)
    alert("El producto se creo correctamente")
    formularioProductos.reset()
    console.log(arrayProductos)
    localStorage.setItem("productos",JSON.stringify(arrayProductos))
})