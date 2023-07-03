const express = require('express');
const app = express();
const category = require('./category');
const user = require('./user');
const barang = require('./barang')
const peminjaman = require('./peminjaman')
const { viewDashboard} = require('../../controller/dashboard/indexController')

app.use('/category/', category);
app.use('/user/', user);
app.use('/barang/', barang);
app.use('/peminjaman/', peminjaman);
app.get('/', viewDashboard)

module.exports = app