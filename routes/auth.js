const express = require('express');
const {create_user,login_user,deleteAllUsers} = require("../services/auth")
const User = require('../models/user')
const routeAuth = express.Router();

routeAuth.post('/register', async(req, res) => {

    const respuesta = await create_user(req.body)
    res.json(respuesta)

});

routeAuth.post('/login', async (req, res) => {
    const respuesta = await login_user(req.body)
    res.json(respuesta)
});

routeAuth.delete('/users', async (req, res) => {
    const respuesta = await deleteAllUsers();
    res.json(respuesta);
  });


module.exports = routeAuth;

