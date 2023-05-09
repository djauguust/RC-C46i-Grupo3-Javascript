// Accede al formulario de registro
const registroForm = document.getElementById('registroForm');

// Agrega un evento de envío al formulario
registroForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtén los valores de los campos
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Realiza las validaciones necesarias

  // Envía los datos del formulario al servidor o realiza otras acciones necesarias
  // Puedes utilizar una API para almacenar los datos del usuario en una base de datos

  // Cierra la ventana modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
  modal.hide();
});

console.log();