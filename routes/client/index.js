const express = require('express');
const app = express();
const { viewPeminjaman} = require('../../controller/client/indexController')

app.get('/', viewPeminjaman)

module.exports = app