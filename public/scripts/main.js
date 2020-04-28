function iniciarSesion() {
  window.location = "/login";
}
function validarusuario() {
  const user = document.querySelector(" #inputlogin :nth-child(1)").value;
  const passw = document.querySelector(" #inputlogin :nth-child(2)").value;
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: user,
      contrasena: passw,
    }),
  }).then((res) => {
    if (res.status === 200) {
     return res.json();

      //window.location = "/userPage";
    } else {
      alert("usuario o contraseña invalidos");
      return false
    }
  })
  .then( res => {
      if(res === false){
        document.querySelector(" #inputlogin :nth-child(1)").style.borderBottom = "red solid 4px"
        document.querySelector(" #inputlogin :nth-child(2)").style.borderBottom = "red solid 4px"
      }else{
        window.sessionStorage.setItem('usuario',  JSON.stringify(res));
        window.location = "/userPage";
      }
  }

  );
}
//-----Página usuario -----//
datosUsuario = JSON.parse(window.sessionStorage.getItem('usuario'));
saldoUsuario = datosUsuario.saldo || 0 ;
document.getElementById("hola").innerHTML = datosUsuario.nombre;
document.getElementById("saldo").innerHTML = "$" + saldoUsuario;
