import { logger } from '../helpers/log4js'
import UserService from '../services/User.service'
import { IdataUserRegistration } from '../../types/userTypes'
import { NextFunction, Request, Response } from 'express'
const userService = new UserService()
export default class UserController {
  async signIn (req: Request, res: Response) {
    try {
      const response = await userService.signIn(req.body)
      if (response.error) {
        return res.status(400).json({
          error: true,
          data: { ...response.data }
        })
      } else {
        return res.status(200).json({
          error: false,
          data: { ...response.data }
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }

  async logOut (req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      logger.info('el usuario cerro sesion')
      res.redirect('/sign-in')
    })
  }

  async signUp (req: Request, res: Response) {
    try {
      const userData: IdataUserRegistration = req.body

      const result = await userService.signUp({
        ...userData,
        avatar: req.file?.path
      })
      if (result.error) {
        return res.status(400).json({
          error: true,
          data: { ...result.data }
        })
      } else {
        return res.status(201).json({
          error: false,
          data: { ...result.data }
        })
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json({
        error: true,
        data: { message: 'Error del servidor' }
      })
    }
  }

  async getProfile (req: Request, res: Response) {
    try {
      return res.json({ error: false, data: req.user }).status(200)
    } catch (error) {
      return res.status(500).json({
        error: true,
        data: { message: 'Error del servidor' }
      })
    }
  }

  async createOrder (req: Request, res: Response) {
    try {
      // @ts-ignore
      const result = await userService.createOrder(req.user.id, req.body.cart)
      if (result.error) {
        return res.status(400).json({
          error: true,
          data: { ...result.data }
        })
      } else {
        return res
          .json({
            error: false,
            data: result
          }).status(201)
      }
    } catch (error) {
      logger.error(error)
      return res
        .json({
          error: true,

          data: { message: 'Ocurrio un error interno creando el pedido' }
        })
        .status(500)
    }
  }
}
