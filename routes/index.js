const express = require('express');
const app = express();
const category = require('./dashboard/category');
const user = require('./dashboard/user');

app.use('/dashboard/', category);
app.use('/dashboard/', user);

module.exports = app