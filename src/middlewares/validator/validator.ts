import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../../helpers/log4js'

export function validateRequest (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorsInfo = errors.array().map(error => error.msg)
    logger.warn(req.body)
    logger.warn(errorsInfo)
    // quitar la palabra "Invalid value" porque molesta:
    const withoutMessageGarbage = errorsInfo.filter(err => err !== 'Invalid value')
    return res.status(400).json({ error: true, data: { message: withoutMessageGarbage } })
  }
  next()
}
