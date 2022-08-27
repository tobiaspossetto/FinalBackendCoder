import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()

export const createToken = (data:any) => {
  const token = jwt.sign({
    id: data.id, username: data.name, email: data.email, adress: data.address, phone: data.phone
  }, <string>process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

  // ! el token se devuelve al usuario para enviarlo en el header
  return token
}

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(403).json({ error: true, data: { message: 'Acceso denegado' } })
  try {
    const verified = jwt.verify(token, <string>process.env.JWT_SECRET_KEY)
    req.user = verified
    next() // continuamos
  } catch (error) {
    return res.status(403).json({ error: true, data: { message: 'Acceso denegado' } })
  }
}

export const verifyTokenFunction = (token:string) => {
  try {
    const verified = jwt.verify(token, <string>process.env.JWT_SECRET_KEY)
    return { error: false, data: verified }
  } catch (error) {
    return { error: true, data: { message: 'No tiene autorizacion' } }
  }
}
