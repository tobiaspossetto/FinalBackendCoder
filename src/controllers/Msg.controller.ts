import MsgService from '../services/Msg.service'
interface IMsg{
    token: string;
    body: string;
  email?:string;
}
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
}

/*

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkMmI2MTY5ZDNhNzA3MjUxZDc4NCIsInVzZXJuYW1lIjoiTWFyaW8gUG9zc2V0dG8iLCJlbWFpbCI6InJzc3RvcnJlc0BnbWFpbC5jb20iLCJpYXQiOjE2NjEzMDI0MDIsImV4cCI6MTY2MTMwNjAwMn0.VWR0rj-GprhTdQPr-p6mqsJdEY3li3CpOoewYAP0LPY",
  "body": "Hola te respondo la consulta...",
  "email": "rsstorres@gmail.com",
}
*/
