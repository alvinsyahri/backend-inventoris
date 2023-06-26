const express = require('express');
const peminjamanController = require('../../controller/dashboard/peminjamanController')
const routes = express.Router();

routes.get('/peminjaman', peminjamanController.viewPeminjaman);
routes.post('/peminjaman', peminjamanController.addPeminjaman);
routes.put('/peminjaman', peminjamanController.editPeminjaman);
routes.delete('/peminjaman/:id', peminjamanController.deletePeminjaman);

module.exports = routes;