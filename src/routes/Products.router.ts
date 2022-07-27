import { Router } from 'express'

import ProductController from '../controllers/Product.controller'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', controller.getAllProducts)

productsRouter.get('/cat/:cat', controller.getProductsByCategory)

productsRouter.get('/:id', controller.getProductsById)
export default productsRouter
