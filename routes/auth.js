const express = require('express');
const user_create_2 = require("../services/auth")
const User = require('../models/user')
const routeAuth = express.Router();

routeAuth.post('/register', async(req, res) => {

    const respuesta = await user_create_2(req.body)
    res.json(respuesta)

});

routeAuth.get('/login', (req, res) => {
  res.json({
    message: 'Estoy en el login'
  });
});

module.exports = routeAuth;

