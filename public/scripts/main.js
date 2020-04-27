function iniciarSesion() {
  window.location = "/login";
}
function validarusuario() {
  const user = document.querySelector(" #inputlogin :nth-child(1)").value;
  const passw = document.querySelector(" #inputlogin :nth-child(2)").value;
  fetch('/login',  {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        usuario: user,
        contrasena: passw
      })
  }).then(res => {
    if(res.status === 200){

    return res.json() 
    } 
   alert("usuario o contraseña invalidos") 
  })
  .then(usuario => {
      console.log(usuario)
      window.sessionStorage.setItem('usuario',usuario);
      //window.location = "/userPage";
    })
}
