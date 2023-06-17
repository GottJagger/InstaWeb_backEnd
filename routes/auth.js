const express = require('express');
const routeAuth = express.Router();


routeAuth.post('/register', (req, res) => {
    console.log('mi cuerpo',req.body);
  res.json({
    message: 'Estoy en el registro'
  });
});

routeAuth.get('/login', (req, res) => {
  res.json({
    message: 'Estoy en el login'
  });
});

module.exports = routeAuth;

/* const User = require('./models/user')
const mi_user = {
    name: 'Jose David Chagui',
    email: 'jdchagui@uninorte.edu.co',
    celular: 3156280895,
    password:"Timecha12",
}
new User(mi_user).save() */
