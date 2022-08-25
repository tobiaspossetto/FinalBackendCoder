import { Router } from 'express'

import UserController from '../controller/User.controller'
import { verifyToken } from '../../middlewares/jwt'
import { multerCheck, upload } from '../../middlewares/multer'
import { orderSchema, signInSchema, signUpSchema } from '../../middlewares/validator/schemas/RequestsSchemas'
import { validateRequest } from '../../middlewares/validator/validator'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', signInSchema, validateRequest, userController.signIn)
//* checkSignUp esta despues de multer porque sino el req.body aparece vacio
userRouter.post('/sign-up', upload.single('avatar'), signUpSchema, validateRequest, multerCheck, userController.signUp)

userRouter.get('/profile', verifyToken, userController.getProfile)

userRouter.post('/createOrder', verifyToken, orderSchema, validateRequest, userController.createOrder)
export default userRouter
