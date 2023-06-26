const express = require('express');
const router = express.Router();
const { createPhoto, getPhoto, getAllPhoto, updatePhoto, deletePhoto } = require('../services/photoService');

// Crear una foto
router.post('/crear', async (req, res) => {
  const respuesta = await createPhoto(req, res);
  res.json(respuesta);
});

// Obtener detalles de una foto
router.get('/detalle/:id/:email', async (req, res) => {
  const respuesta = await getPhoto(req, res);
  return respuesta
});

// Obtener detalles de todas las fotos
router.get('/todo/:email', async (req, res) => {
    const respuesta = await getAllPhoto(req, res);
    return res
  });

// Actualizar una foto
router.put('/actualizar/:id', async (req, res) => {
  const respuesta = await updatePhoto(req, res);
  return res
});

// Eliminar una foto
router.delete('/eliminar/:id', async (req, res) => {
  const respuesta = await deletePhoto(req, res);
  return res
});
 
module.exports = router;
