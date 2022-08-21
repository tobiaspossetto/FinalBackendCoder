// Este middleware es especifico para validar el campo signUp porque al enviarlo como multipart form-data me da error con Express validator
import { Request, Response, NextFunction } from 'express'
import { logger } from '../../helpers/log4js'
export const checkSignUp = (req: Request, res: Response, next: NextFunction) => {
  if (
    (req.body.email === undefined || req.body.email === null) ||
    (req.body.password === undefined || req.body.password === '') ||
    (req.body.name === undefined || req.body.name === '') ||
    (req.body.phone === undefined || req.body.phone === '') ||
    (req.body.address === undefined || req.body.address === '')
  ) {
    logger.info(req.body)
    res.status(400).json({
      error: true,
      data: { message: 'Hay campos incompletos o incorrectos' }
    })
  } else {
    logger.info(req.body)
    next()
  }
}
