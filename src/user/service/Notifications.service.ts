import { logger } from '../../helpers/log4js'

import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_PRINCIPAL,
    pass: process.env.GMAIL_PASSWORD
  }
})

export const EmailUserRegister = async (to:string) => {
  const mailOptions = {
    from: process.env.GMAIL_PRINCIPAL,
    to,
    subject: 'Tu registro fue exitoso!!',
    text: `Hola!! Con este correo se notifica que ha sido registrado con exito. 🥳️, si no fuiste tu, ignora este mensaje.
    
    `
  }

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error)
      } else {
        logger.info('Email sent: ' + info.response)
        return true
      }
    })
  } catch (error) {
    logger.error(error)
    return false
  }
}
interface IDataUser {
  name:string,
  address:string,
  phone:number,
}

export const EmailAdminUserRegister = async (data:IDataUser) => {
  const mailOptions = {
    from: process.env.GMAIL_PRINCIPAL,
    to: process.env.GMAIL_PRINCIPAL,
    subject: 'Nuevo registro en la app',
    text: `Hola!! Con este correo se notifica que: ${data.name}, ha sido registrado con exito. 🥳️
    DATOS DEL NUEVO USUARIO:
    Nombre: ${data.name}
    Direccion: ${data.address}
    Telefono: ${data.phone}
  `
  }

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error)
      } else {
        logger.info('Email sent: ' + info.response)
        return true
      }
    })
  } catch (error) {
    logger.error(error)
    return false
  }
}

export const EmailOrderUser = async (to:string, order:any, id:string) => {
  const mailOptions = {
    from: process.env.GMAIL_PRINCIPAL,
    to,
    subject: 'Tu pedido fue realizado con exito',
    text: `Hola!!  ${order.user.name}, Con este correo se notifica que:  ha realizado un nuevo pedido. 🥳️.
    Sigue el pedidio con el codigo: ${id}
    Esta es la información del pedido:
    ${JSON.stringify(order, null, 2)}

    `
  }

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error)
      } else {
        logger.info('Email sent: ' + info.response)
        return true
      }
    })
  } catch (error) {
    logger.error(error)
    return false
  }
}

export const EmailOrderAdmin = async (order:any, id:string) => {
  const mailOptions = {
    from: process.env.GMAIL_PRINCIPAL,
    to: process.env.GMAIL_PRINCIPAL,
    subject: 'Nuevo pedido en la app',
    text: `Hola!! Con este correo se notifica que: ${order.user.name}, ha realizado un nuevo pedido. 🥳️.
    Sigue el pedidio con el codigo: ${id}
    Esta es la información del pedido:
    ${JSON.stringify(order, null, 2)}

    `
  }

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error)
      } else {
        logger.info('Email sent: ' + info.response)
        return true
      }
    })
  } catch (error) {
    logger.error(error)
    return false
  }
}
