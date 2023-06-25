const express = require('express');
const categoryController = require('../../controller/dashboard/categoryController')
const routes = express.Router();

routes.get('/category', categoryController.viewCategory);
routes.post('/category', categoryController.addCategory);
routes.put('/category', categoryController.editCategory);
routes.delete('/category/:id', categoryController.deleteCategory);

module.exports = routes;