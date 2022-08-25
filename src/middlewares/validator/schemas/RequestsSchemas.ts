import { body } from 'express-validator'

export const signUpSchema = [
  body('email').notEmpty().isEmail().withMessage('Falta el campo email o es incorrecto'),
  body('password').notEmpty().isString().withMessage('Falta el campo password o es incorrecto'),
  body('confirmPassword').notEmpty().withMessage('Falta el campo confirm password o es incorrecto'),
  body('name').notEmpty().isString().withMessage('Falta el campo name o es incorrecto'),
  body('phone').notEmpty().isString().withMessage('Falta el campo phone o es incorrecto'),
  body('address').notEmpty().isString().withMessage('Falta el campo address o es incorrecto')

]

export const signInSchema = [
  body('email').notEmpty().withMessage('Hay un campo vacio').isEmail().withMessage('Falta el campo email o es incorrecto'),
  body('password').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo password o es incorrecto')

]

export const orderSchema = [
  body('cart').notEmpty().isArray({ min: 1 }).withMessage('Falta el campo cart o esta vacio'),
  body('cart.*.productId').notEmpty().isString().withMessage('Falta el id de alguno de los productos'),
  body('cart.*.quantity').isNumeric().isInt({ min: 1 }).withMessage('Falta la cantidad de alguno de los productos o es menor a 1')
]

export const productSchema = [
  body('product').notEmpty().isObject().withMessage('Falta el campo producto o esta vacio'),

  body('product.name').isString().withMessage('Falta el campo title o es incorrecto'),
  body('product.description').isString().withMessage('Falta el campo description o es incorrecto'),
  body('product.image').isString().withMessage('Falta el campo thumbnail o es incorrecto'),
  body('product.category').isString().withMessage('Falta el campo category o es incorrecto'),
  body('product.price').isNumeric().isInt({ min: 1 }).withMessage('Falta el campo price o es incorrecto'),
  body('product.stock').isNumeric().isInt({ min: 0 }).withMessage('Falta el campo stock o es incorrecto')

]
