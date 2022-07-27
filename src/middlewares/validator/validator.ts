import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export function validateRequest (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsInfo = errors.array().map(error => error.msg)
    return res.status(400).json({ error: true, data: errorsInfo })
  }
  next()
}
