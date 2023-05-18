let usuarios = [];
const obtenerusuarios = localStorage.getItem("usuario");
if (obtenerusuarios) {
  usuarios = JSON.parse(obtenerusuarios) || [];
}

console.log(usuarios);

const botonRegistro = document.getElementById("botonRegistrar");
function saveData() {
  const username = document.getElementById("usuario").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("contrasenia").value;
  const password2 = document.getElementById("password2").value;

  const usuarioNuevo = {
    username,
    email,
    password,
  };
  usuarios.push(usuarioNuevo);
  localStorage.setItem("usuario", JSON.stringify(usuarios));
}
botonRegistro.addEventListener("click", (e) => {
  const email = document.getElementById("email").value;
  console.log(emailExistente(email));
  if (!emailExistente(email) && validarContrasenias(password, password2)) {
    saveData();
  }
});
// funcion para validar email
function emailExistente(email) {
  //Validar Email existente
  const index = usuarios.findIndex((u) => u.email === email);
  if (index == -1) {
    return false;
  } else {
    // Falta mostrar al usuario que el email ya esta registrado
    return true;
  }
}

function validarContrasenias(c1, c2) {
  return c1 === c2;
}

// Función para validar el formulario de registro
function validarRegistro(username, email, password, password2) {
  if (
    email != null &&
    email != "" &&
    password != null &&
    password != "" &&
    password2 != null &&
    password2 != "" &&
    username != null &&
    username != ""
  ) {
   //si pasa las validaciones
    return true;
  }

  //Falta mostrar al usuario que debe cmpletar todos los campos
  return false;
}
//Asignar el evento submit al formulario
document.getElementById("usuario").addEventListener("click", function (e) {
  e.preventDefault(); // Evitar envío del formulario si no pasa las validaciones
  if (validarRegistro()) {
    // Aquí puedes enviar el formulario o realizar otras acciones necesarias
    alert("Formulario válido. Se puede realizar el registro.");
  }
});
