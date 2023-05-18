import { CartelGigante } from "./codigoProducto.js";

document.getElementById("botonRegistrar").addEventListener("click", (e) => {
  validacionBootstrap();
  
    // Obtén los valores de los campos del formulario
    const usuario1 = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('contrasenia').value;
    // Crea un objeto de usuario con los datos obtenidos
    const usuarioObjeto = {
      usuario: usuario1,
      email: email,
      contrasenia: contrasenia
    };
  
    // Guarda el objeto de usuario en el local storage
    localStorage.setItem('usuario1', JSON.stringify(usuarioObjeto));
  
    // Limpia los campos del formulario
    document.getElementById('usuario').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contrasenia').value = '';
 // Obtiene los usuarios existentes del local storage (si los hay)
    let usuario = JSON.parse(localStorage.getItem('usuario')) || [];
  // Validar usuario existente
  const usuarioExistente = usuario.find(u => u.usuario === usuario1 );
  const usuarioExistente2 = usuario.find(u =>  u.email === email);
  if (usuarioExistente) {
    CartelGigante(
      `¡El usuario ya está registrado!`,
      `error`
    );
    return;
  }
  if (usuarioExistente2) {
    CartelGigante(
      `¡El email ya está registrado!`,
      `error`
    );
    return;
  }
   // Validar que todos los campos estén completos
   if (!usuario1 || !email || !contrasenia) {
    CartelGigante(
      `Por favor, complete todos los campos`,
      `error`
    );
    return;
  }

  // Validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    CartelGigante(
      `Por favor, ingrese un email válido`,
      `error`
    );
    return;
  }

  // Validar la contraseña (ejemplo: longitud mínima de 8 caracteres)
  if (contrasenia.length < 8) {
    CartelGigante(
      `La contraseña debe tener al menos 8 caracteres`,
      `error`
    );
    return;
  }
  
    // Agrega el nuevo usuario al array de usuarios
    usuario.push(usuarioObjeto);
    // Guarda el array de usuarios en el local storage
  localStorage.setItem('usuario', JSON.stringify(usuario));

  document.getElementById('usuario').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contrasenia').value = '';
  
  Swal.fire({
    title: "Usuario registrado correctamente",
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  // Espera unos segundos segundos antes de redirigir al usuario
  setTimeout(function () {
    window.location.href = "../login.html";
  }, 3000);
    
  });

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