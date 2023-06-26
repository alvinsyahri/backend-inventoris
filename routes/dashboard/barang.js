const express = require('express');
const barangController = require('../../controller/dashboard/barangController')
const routes = express.Router();

routes.get('/barang', barangController.viewBarang);
routes.post('/barang', barangController.addBarang);
routes.put('/barang', barangController.editBarang);
routes.delete('/barang/:id', barangController.deleteBarang);

module.exports = routes;