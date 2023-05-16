let listaFavoritos = [];
let productos = [];
let usuarioLogeado = [];

const obtenerProductos = localStorage.getItem("productos");
const obtenerListaFavoritos = localStorage.getItem("pDeseado");
const obtenerUsuarioLogeado = localStorage.getItem("userLogin");

if (obtenerProductos) {
    productos = JSON.parse(obtenerProductos) || [];
}

if (obtenerListaFavoritos) {
    listaFavoritos = JSON.parse(obtenerListaFavoritos) || []; 
}

if (obtenerUsuarioLogeado) {
    usuarioLogeado = JSON.parse(obtenerUsuarioLogeado) || []; 
}

const favoritosBoton = document.getElementById("btnFav");
const productoDetalle = document.getElementById("titulo").innerHTML;

favoritosBoton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("anda");

    const producto = productos.find((p) => p.name===productoDetalle)
    console.log(productos);
    console.log(producto);
    if(producto){
        const nuevoPDeseado = { 
            usuarioLogeado, producto
        }
        console.log(nuevoPDeseado);
        listaFavoritos.push(nuevoPDeseado);
        localStorage.setItem("pDeseado",JSON.stringify(nuevoPDeseado));
    }
});