//clase
class User {
  constructor(usuario, email, contraseña) {
    this.usuario = usuario;
    this.email = email;
    this.contraseña = contraseña;
  }
}


// Accede al formulario de registro
var registroForm = document.getElementById('registroForm');



  // Obtén los valores de los campos
  const forms = document.querySelectorAll(".needs-validation")
  const usuario = document.getElementById('User').value;
  const email = document.getElementById('email').value;
  const contrasenia = document.getElementById('contraseña').value;
 
//agregando eventos

inputUsuarioReg.addEventListener("blur", () => {
  requiredField(inputUsuarioReg);
});

inputEmailReg.addEventListener("blur", () => {
  validateEmail(inputEmailReg);
});

inputPassReg.addEventListener("blur", () => {
  validatePass(inputPassReg);
});

formReg.addEventListener("submit", saveUser);

//validaciones

function requiredField(inputUserReg) {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validateEmail(inputEmailReg) {
  let regEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regEmail.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validatePass(inputPassReg) {
  let regPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if (regPass.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function gralValidate(inputUser, inputEmail, inputPass) {
  if (
    requiredField(inputUser) &&
    validateEmail(inputEmail) &&
    validatePass(inputPass)
  ) {
    return true;
  } else {
    return false;
  }
};

function saveUser(e) {
  e.preventDefault();
  if (gralValidate(inputUserReg, inputEmailReg, inputPassReg)) {
    createUser();
    window.setTimeout(function () {
      window.location.replace("login.html");
    }, 1500);
  } else {
    alert("Debe completar todos los campos");
  }
}

function createUser() {
  let newUser = new User(
    inputUserReg.value,
    inputEmailReg.value,
    inputPassReg.value
  );
  regUser.push(newUser);
  cleanFormUser();
  Swal.fire(
    "Usuario creado",
    "Su usuario fue correctamente cargado",
    "success"
  );
}

function cleanFormUser() {
  formReg.reset();
  inputUsuarioReg.className = "form-control";
  inputEmailReg.className = "form-control";
  inputPassReg.className = "form-control";
  saveUserLS();
}

function saveUserLS() {
  localStorage.setItem("regUser", JSON.stringify(regUser));
};

console.log(inputUsuarioReg);