import { Router } from 'express'

import ProductController from '../controllers/Product.controller'
import { verifyToken } from '../middlewares/jwt'

import { isAuth } from '../middlewares/passportMiddleware'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', verifyToken, controller.getAllProducts)

productsRouter.get('/cat/:cat', verifyToken, controller.getProductsByCategory)

productsRouter.get('/:id', verifyToken, controller.getProductsById)
export default productsRouter
