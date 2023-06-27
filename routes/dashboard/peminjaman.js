const express = require('express');
const { viewPeminjaman, addPeminjaman, editPeminjaman, deletePeminjaman } = require('../../controller/dashboard/peminjamanController')
const routes = express.Router();

routes.get('/', viewPeminjaman);
routes.post('/', addPeminjaman);
routes.put('/', editPeminjaman);
routes.delete('/:id', deletePeminjaman);

module.exports = routes;