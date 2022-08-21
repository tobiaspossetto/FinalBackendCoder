import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../Models/User.model'

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user:any = await UserModel.findById(req.user.id)

  if (user.admin) {
    next()
  } else {
    res.status(403).send('No autorizado: No tienes permisos para realizar esta acción')
  }
}
