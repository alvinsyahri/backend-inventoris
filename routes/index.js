const express = require('express');
const app = express();
const category = require('./dashboard/category');
const user = require('./dashboard/user');
const barang = require('./dashboard/barang')
const peminjaman = require('./dashboard/peminjaman')

app.use('/dashboard/', category);
app.use('/dashboard/', user);
app.use('/dashboard/', barang);
app.use('/dashboard/', peminjaman);

module.exports = app