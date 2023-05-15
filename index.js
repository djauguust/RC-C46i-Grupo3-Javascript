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

console.log(usuarioLogeado.userLogin);
/* caso 3*/
if(usuarioLogeado.userLogin==`none`){
    /*caso sin logearse*/
    linkAdmin.className ="d-none";
    btnCerrarSesion.className= "d-none";

} else {
    /*caso de logeo sin admin*/
    linkRegistro.className ="d-none";
    btnIniciarSesion.className = "d-none";
    if(usuarioLogeado.userLogin==`admin`){
        /*caso admin */

    }else{
    linkAdmin.className ="d-none";
    }
} 

/*btnCerrarSesion.addEventListener("click", (e) => {
    if (usuarioLogeado !==`none`) {
        usuarioLogeado = [`none`]
        localStorage.setItem("userLogin", JSON.stringify(usuarioLogeado));
        localStorage.removeItem("user");
        window.location.replace("index.html");
        } })*/