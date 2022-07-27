import { logger } from '../helpers/log4js'

import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

const accountSid = process.env.TWILLIO_ACCOUNT_SID
const authToken = process.env.TWILLIO_ACCOUNT_authToken
const client = require('twilio')(accountSid, authToken)

export const sendWpp = (data: {name:string, order:any}) => {
  client.messages
    .create({
      body: `Hola!! Con este mensaje se notifica que: ${data.name}, ha realizado un nuevo pedido. 🥳️.
        Esta es la información del pedido:
        ${JSON.stringify(data.order, null, 2)}
  
        `,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5493564528523'
    })
    .then((message: any) => {
      logger.info('WPP enviado')
      return 1
    })
    .catch((err: any) => {
      logger.error(err)
      return 0
    })
    .done()
}

export const sendSms = (body: {name?:string, code?:string, onlyMsg?:string}, to:any, email?:any) => {
  client.messages
    .create({
      body: `Hola ${body.name}! Tu pedido está en camino!! Puedes ver el estado del pedido con este código: ${body.code}`,
      from: '+1 719 745 8081',
      to
    })
    .then((message: any) => {
      logger.info('SMS enviado')
      return 1
    })
    .catch((err: any) => {
      logger.error(err)
      sendSms({ onlyMsg: 'Ocurrio un error enviando la notificacion del pedido a ' } + email, '+543564528523')
      return 0
    })
    .done()
}

dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tango45245362@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

export const sendMail = async (info:any) => {
  const mailOptions = {
    from: 'tango45245362@gmail.com',
    to: info.to,
    subject: info.subject,
    text: info.text
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
