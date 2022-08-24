import { logger } from '../helpers/log4js'
import { verifyTokenFunction } from '../middlewares/jwt'
import MsgPersistence from '../persistence/Msg.persistence'
const persistence = new MsgPersistence()
export default class MsgService {
  async sendMsg (data:{token:string, body:string}) {
    try {
      const tokenValid = await verifyTokenFunction(data.token)
      if (tokenValid.error) {
        return tokenValid
      }
      logger.warn(tokenValid)

      // @ts-ignore
      const isAdmin = await persistence.isAdmin(tokenValid.data.id)
      if (isAdmin) {
        return {
          error: true,
          data: { msg: 'Un administrador no puede hacer una consulta' }
        }
      }
      const msg = {
      // @ts-ignore
        email: tokenValid.data.email,
        body: data.body,
        type: false
      }

      const saved = await persistence.createMsg(msg)
      return saved
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { msg: 'Ocurrio un error guardando el mensaje ' }
      }
    }
  }

  async sendMsgAdmin (data:{token:string, body:string, email:string}) {
    try {
      const tokenValid = await verifyTokenFunction(data.token)
      if (tokenValid.error) {
        return tokenValid
      }
      logger.warn(tokenValid)

      // @ts-ignore
      const isAdmin = await persistence.isAdmin(tokenValid.data.id)
      if (!isAdmin) {
        return {
          error: true,
          data: { msg: 'Acceso denegado' }
        }
      }
      const msg = {
      // @ts-ignore
        email: data.email,
        body: data.body,
        type: true
      }

      const saved = await persistence.createMsg(msg)
      return saved
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { msg: 'Ocurrio un error guardando el mensaje ' }
      }
    }
  }
}
