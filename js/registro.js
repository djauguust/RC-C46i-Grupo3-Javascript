document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
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
  const usuarioExistente = usuario.find(u => u.usuario1 === usuario1 || u.email === email);
  if (usuarioExistente) {
    alert('El usuario o el email ya están registrados');
    return;
  }
   // Validar que todos los campos estén completos
   if (!usuario1 || !email || !contrasenia) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    alert('Por favor, ingrese un email válido.');
    return;
  }

  // Validar la contraseña (ejemplo: longitud mínima de 8 caracteres)
  if (contrasenia.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
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