import { logger } from '../../helpers/log4js'
import { MsgModel } from '../Model/Msg.model'
import { UserModel } from '../../user/model/User.model'

export default class MsgDaos {
  async isAdmin (id:string) {
    const res = await UserModel.findById(id)
    if (res?.admin) {
      return true
    } else {
      return false
    }
  }

  async createMsg (msg:any) {
    try {
      const message = new MsgModel(msg)
      const res:any = await message.save()
      return { error: false, data: res._id }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { msg: 'Ocurrio un error guardando el mensaje en la base de datos' }
      }
    }
  }

  async listAll () {
    try {
      const res = await MsgModel.find()
      return {
        error: false,
        data: res
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { msg: 'Ocurrio un error consultando en la base de datos' }
      }
    }
  }

  async listByEmail (email: string) {
    try {
      const res = await MsgModel.find({ email })
      return {
        error: false,
        data: res
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { msg: 'Ocurrio un error consultando en la base de datos' }
      }
    }
  }
}
