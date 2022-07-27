import { Router } from 'express'

import UserController from '../controllers/User.controller'
import { verifyToken } from '../middlewares/jwt'
import { multerCheck, upload } from '../middlewares/multer'
import { orderSchema, signInSchema, signUpSchema } from '../middlewares/validator/schemas/RequestsSchemas'
import { validateRequest } from '../middlewares/validator/validator'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', signInSchema, validateRequest, userController.signIn)

userRouter.post('/sign-up', signUpSchema, validateRequest, upload.single('avatar'), multerCheck, userController.signUp)

userRouter.post('/logout', verifyToken, userController.logOut)

userRouter.get('/profile', verifyToken, userController.getProfile)

userRouter.post('/createOrder', verifyToken, orderSchema, validateRequest, userController.createOrder)
export default userRouter
