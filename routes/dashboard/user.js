const express = require('express');
const userController = require('../../controller/dashboard/userController')
const routes = express.Router();

routes.get('/user', userController.viewUser);
routes.post('/user', userController.addUser);
routes.put('/user', userController.editUser);
routes.delete('/user/:id', userController.deleteUser);

module.exports = routes;