let usuarioLogeado = [];
const obtenerUsuarioLogeado = localStorage.getItem("userLogin");

if(obtenerUsuarioLogeado){
    usuarioLogeado = JSON.parse(obtenerUsuarioLogeado) || [];
}


/*1) Admin --> aparece admin en navbar y cerrar sesion --- desaparecen login y registro
2) usuario comun --> cerrar sesion --- desaparecen login y registro
3) sin logeo --> fav pero te lleva login --> login y reg aparecen*/
const linkAdmin = document.getElementById("linkAdmin");
const linkRegistro = document.getElementById("linkRegistro");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");

console.log(usuarioLogeado);
/* caso 3*/
if(usuarioLogeado[0] == "none"){
    /*caso sin logearse*/
    linkAdmin.className ="nav-link d-none";
    btnCerrarSesion.className= "d-none";

} else {
    /*caso de logeo sin admin*/
    linkRegistro.className ="nav-link d-none";
    btnIniciarSesion.className = "d-none";
    if(usuarioLogeado[0] == "admin"){
        /*caso admin */
        linkAdmin.className = "nav-link";
    }else{
        linkAdmin.className ="nav-link d-none";
    }
} 

btnCerrarSesion.addEventListener("click", (e) => {
    if (usuarioLogeado[0] !== "none") {
        usuarioLogeado = ["none"];
        localStorage.setItem("userLogin", JSON.stringify(usuarioLogeado));
        localStorage.removeItem("user");
        window.location.replace("index.html");
    }
});
