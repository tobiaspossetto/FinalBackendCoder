import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { logger } from '../helpers/log4js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/img')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
export const upload = multer({ storage })

export const multerCheck = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file
  if (!file) {
    logger.error('no hay file')
    return res.json({ error: true, data: { message: 'Falta el campo Avatar' } }).status(400)
  } else {
    next()
  }
}
