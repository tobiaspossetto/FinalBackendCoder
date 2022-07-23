import { Router, Request, Response } from 'express'
import passport from 'passport'
import UserController from '../controllers/User.controller'
import { logger } from '../helpers/log4js'
import { verifyToken } from '../middlewares/jwt'
import { multerCheck, upload } from '../middlewares/multer'

const userController = new UserController()
const userRouter = Router()

userRouter.post('/sign-in', userController.signIn)

userRouter.post('/sign-up', upload.single('avatar'), multerCheck, userController.signUp)

userRouter.post('/logout', verifyToken, userController.logOut)

userRouter.get('/profile', verifyToken, userController.getProfile)

userRouter.post('/createOrder', verifyToken, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const result = await userController.createOrder(req.user.id, req.body.cart)
    if (result?.error) {
      res.json(result).status(400)
    } else {
      res.json(result).status(200)
    }
  } catch (error) {
    logger.error(error)
    res.json({
      error: true,
      code: 4,
      data: { message: 'Ocurrio un error interno' }
    }).status(500)
  }
})
export default userRouter
