import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../user/model/User.model'

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user:any = await UserModel.findById(req.user.id)

  if (user.admin) {
    next()
  } else {
    res.status(403).json({ error: true, data: { message: 'No esta autorizado para realizar esta accion' } })
  }
}
