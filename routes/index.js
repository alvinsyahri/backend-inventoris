const express = require('express');
const app = express();
const index = require('./dashboard/index');
const { verifyUser } = require('../middleware/verifyUser')
const auth = require('./auth/auth')

app.use('/dashboard/', [verifyUser, index]);
app.use(auth);

module.exports = app