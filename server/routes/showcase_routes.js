import { Router } from 'express'
import {showcaseController} from '../controllers/showcase_controller.js'
import { asyncErrorHandler } from '../utils/async_err_handler.js';

export const showcaseRouter = new Router()
    .post('/showcase', asyncErrorHandler(showcaseController.createShowcase))
    .get('/showcase', asyncErrorHandler(showcaseController.getShowcase))
    .get('/showcase/:id', asyncErrorHandler(showcaseController.getOneShowcase))
    .put('/showcase', asyncErrorHandler(showcaseController.updateShowcase))
    .delete('/showcase/:id', asyncErrorHandler(showcaseController.deleteShowcase));