const express = require("express");
const app = express();

app.use(express.json());

app.use('/public',express.static('public'));

const usuarios = {
  1: { 
    usuario: "Emmanuel123",
    nombre: "Emmanuel",
    email: "emauel@mail.com",
    contrasena : "1234",
    id : 1 
  },
  2: {
    usuario : "DavidHH",
    nombre: "David Jaimes",
    email: "David@mail.com",
    contrasena : "5678abc", 
    id : 2
  },
  3: {
    usuario : "Juancho345",
    nombre: "Juan Vargas",
    email: "rgasl@mail.com",
    contrasena : "abcd",
    id : 3 
  },
  4: {
    usuario : "Sebastiano",
    nombre: "Sebastian Jaimes",
    email: "Sebastl@mail.com",
    contrasena : "efgh123",
    id : 4 
  }
};

let inIncr = 5;

//json usiario
//{
  //"usuario":"",
  //"contraseña":"",
  //"cantidadDeDinero":
//}

//Servir inicio
app.get("/", (req, res) => {
 res.sendFile('/home/juanse/Documentos/ejercicios/bank/public/pages/index.html')
});
//Servir login
app.get("/login", (req, res) => {
  res.sendFile('/home/juanse/Documentos/ejercicios/bank/public/pages/login.html')
 });
 app.get("/userPage", (req, res) => {
  res.sendFile('/home/juanse/Documentos/ejercicios/bank/public/pages/user.html')
 });

//Registro de usuario
app.post("/usuarios", (req, res) => {
  const id = inIncr++;
  const nuevoUsuario =  {...req.body, id} ;
  usuarios[id] = nuevoUsuario;
  res.status(201).json(usuarios[id]);
});

//Ver otros usuarios
app.get("/usuarios", (req, res) => {
  res.json(Object.values(usuarios));
});

//login
app.post("/login", (req, res) => {

  const usuario = req.body.usuario; 
  const contrasena = req.body.contrasena;
  const baseDeDatosUsuarios = Object.values(usuarios);


  const usuarioEncontrado = baseDeDatosUsuarios.find(element => element.usuario === usuario)

  if(!usuarioEncontrado){
    res.sendStatus(404)
  }
  if(usuarioEncontrado.contrasena !== contrasena ){
    res.sendStatus(404)
  }
  
  else{
    res.status(200).json(usuarioEncontrado)
  }


});

//saber saldo
app.get("/usuarios/:id/saldo", (req, res) => {
  const id = parseInt(req.params.id)
  const saldo = usuarios[id].saldo
  res.status(200).json(saldo)
});

//Asignar dinero de parte del administrador
app.patch("/admin/asignar-dinero", (req, res) => {
  const { usuario, monto } = req.body;
  const baseDeDatosUsuarios = Object.values(usuarios);
  
  const usuarioEncontrado = baseDeDatosUsuarios.find(element => element.usuario === usuario)

  if(!usuarioEncontrado){
    res.sendStatus(404)
  }else{
    usuarioEncontrado.monto = monto;
    res.status(200).json(usuarioEncontrado)
  }

})

//Transferencia de dinero
app.patch("/usuarios/:id/transferir", (req, res) => {
  const { usuario, monto } = req.body;
  const baseDeDatosUsuarios = Object.values(usuarios);
  
  const usuarioEncontrado = baseDeDatosUsuarios.find(element => element.usuario === usuario)
    if(!usuarioEncontrado){
    res.sendStatus(404)
  }else{
    usuarioEncontrado.monto =  usuarioEncontrado.monto + monto;
    res.status(200).json(usuarioEncontrado)
  }
  
});

app.listen(3030, () => {
  console.log("Servidor corriendo en el puerto 3030");
});