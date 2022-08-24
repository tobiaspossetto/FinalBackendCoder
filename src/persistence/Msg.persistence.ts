import { logger } from '../helpers/log4js'
import { MsgModel } from '../Models/Msg.model'
import { UserModel } from '../Models/User.model'

export default class MsgPersistence {
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
}
