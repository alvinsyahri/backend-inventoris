const express = require('express');
const app = express();
const category = require('./category');
const user = require('./user');
const barang = require('./barang')
const peminjaman = require('./peminjaman')

app.use('/category/', category);
app.use('/user/', user);
app.use('/barang/', barang);
app.use('/peminjaman/', peminjaman);

module.exports = app