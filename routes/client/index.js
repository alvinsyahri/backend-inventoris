const express = require('express');
const app = express();
const { viewPeminjaman, addPeminjaman} = require('../../controller/client/indexController')

app.get('/', viewPeminjaman)
app.post('/', addPeminjaman)

module.exports = app