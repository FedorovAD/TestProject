import { Router } from 'express'
import {productsController} from '../controllers/products_controller.js'
import { asyncErrorHandler } from '../utils/async_err_handler.js';

export const productsRouter = new Router()
    .post('/products', asyncErrorHandler(productsController.createProducts))
    .get('/products', asyncErrorHandler(productsController.getProducts))
    .get('/products/:id', asyncErrorHandler(productsController.getOneProduct))
    .put('/products', asyncErrorHandler(productsController.updateProduct))
    .delete('/products/:id', asyncErrorHandler(productsController.deleteProduct));