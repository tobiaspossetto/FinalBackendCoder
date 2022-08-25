import { Router } from 'express'

import ProductController from '../controller/Product.controller'
import { isAdmin } from '../../middlewares/isAdmin'
import { verifyToken } from '../../middlewares/jwt'
import { productSchema } from '../../middlewares/validator/schemas/RequestsSchemas'
import { validateRequest } from '../../middlewares/validator/validator'

const productsRouter = Router()
const controller = new ProductController()
productsRouter.get('/', controller.getAllProducts)

productsRouter.get('/cat/:cat', controller.getProductsByCategory)

productsRouter.get('/id/:id', controller.getProductsById)
productsRouter.put('/:id', verifyToken, isAdmin, productSchema, validateRequest, controller.updateProduct)
productsRouter.delete('/:id', verifyToken, isAdmin, controller.deleteProduct)
productsRouter.post('/create', verifyToken, isAdmin, productSchema, validateRequest, controller.createProduct)
export default productsRouter
