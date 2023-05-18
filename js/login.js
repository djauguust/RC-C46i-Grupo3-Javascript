//Funcion que logea al usuario
function logear() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  let userComparation = usuario.find((p) => p.email === email);

  if (!userComparation) {
    RechazarConexion();
    return;
  }

  if (email == userComparation.email && pass == userComparation.contrasenia) {
    //Muestra mensaje de logeo correcto
    const form = document.querySelector("#form");
    console.log(`1`);
    form.addEventListener("submit", function (event) {
      // Detener el envío por defecto
      event.preventDefault();
    });
    Swal.fire({
      title: "Bienvenido!" + " " + userComparation.usuario,
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    // Se guarda usuario logeado en local storage
    const userLogin = [userComparation.usuario];

    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    // Espera unos segundos segundos antes de redirigir al usuario
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 3000);
  }
  //Muestra mensaje de logeo erroneo
  else {
    RechazarConexion();
  }
}

function RechazarConexion() {
  const form = document.querySelector("#form");

  form.addEventListener("submit", function (event) {
    // Detener el envío por defecto
    event.preventDefault();
  });
  Swal.fire({
    title: "Error al iniciar sesion",
    text: "Por favor verifica los datos ingresados",
    icon: "error",
    confirmButtonColor: "#DD6B55",
  });
}
