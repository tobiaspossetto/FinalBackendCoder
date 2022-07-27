import { body } from 'express-validator'

// export const paymentSchema = [
//   body('items').isArray({ min: 1 }).withMessage('items must be an array with at least one item'),
//   body('items.*.title').isString().withMessage('title of item must be a string'),
//   body('items.*.description').isString().withMessage('title of item must be a string'),
//   body('items.*.quantity').isNumeric().isLength({ min: 1 }).withMessage('quantity of item must be a number greater than 0'),
//   body('items.*.picture_url').isString().withMessage('picture_url of item must be a string'),

//   body('items.*.unit_price').isNumeric().isLength({ min: 1 }).withMessage('unit_price of item must be a number greater than 0'),
//   body('payer_email').isEmail().withMessage('payer_email must be a email ')

// ]

export const signUpSchema = [
  body('email').notEmpty().withMessage('Hay un campo vacio').isEmail().withMessage('Falta el campo email o es incorrecto'),
  body('password').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo password o es incorrecto'),
  body('name').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo name o es incorrecto'),
  body('phone').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo phone o es incorrecto'),
  body('address').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo address o es incorrecto')
]

export const signInSchema = [
  body('email').notEmpty().withMessage('Hay un campo vacio').isEmail().withMessage('Falta el campo email o es incorrecto'),
  body('password').notEmpty().withMessage('Hay un campo vacio').isString().withMessage('Falta el campo password o es incorrecto')

]

export const orderSchema = [
  body('cart').isArray({ min: 1 }).withMessage('Falta el campo cart o esta vacio'),
  body('cart.*.productId').isString().withMessage('Falta el id de alguno de los productos'),
  body('cart.*.quantity').isInt({ min: 1 }).withMessage('Falta la cantidad de alguno de los productos o es menor a 1')
]
