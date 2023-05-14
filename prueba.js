function saveData() {
    // Obtener valores del formulario
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Crear objeto con los datos
    const usuario = {
      usuario: username,
      email: email,
      contrasenia: password
    };
  
    // Convertir objeto a JSON y guardarlo en el local storage
    localStorage.setItem("usuario", JSON.stringify(usuario));
  
    // Confirmar al usuario que los datos se guardaron exitosamente
    alert("Datos guardados exitosamente en el local storage.");
  }
  