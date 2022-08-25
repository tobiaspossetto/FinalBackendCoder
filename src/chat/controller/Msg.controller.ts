import { IMsg } from '../../../types/msgTypes'
import MsgService from '../service/Msg.service'

const service = new MsgService()
export default class MsgController {
  async newMsg (data:IMsg) {
    if (data.token === undefined || data.body === undefined) {
      return {
        error: true,
        data: { msg: 'Falta el token de seguridad o el campo body es invalido' }
      }
    }

    const res = await service.sendMsg(data)
    return res
  }

  async newMsgAdmin (data:any) {
    if (data.token === undefined || data.body === undefined || data.email === undefined) {
      return {
        error: true,
        data: { msg: 'Falta el token de seguridad o el campo body es invalido' }
      }
    }

    const res = await service.sendMsgAdmin(data)
    return res
  }

  async listAll (data:{token:string}) {
    if (data.token === undefined) {
      return {
        error: true,
        data: { msg: 'Falta el token de seguridad ' }
      }
    }

    const res = await service.listAll(data)
    return res
  }

  async listByEmail (data:{token:string}) {
    if (data.token === undefined) {
      return {
        error: true,
        data: { msg: 'Falta el token de seguridad ' }
      }
    }

    const res = await service.listByEmail(data)
    return res
  }
}
