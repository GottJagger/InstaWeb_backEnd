const express = require('express');
const routeAuth = express.Router();

routeAuth.post('/register', (req, res) => {
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
