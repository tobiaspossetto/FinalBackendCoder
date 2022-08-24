import MsgController from '../controllers/Msg.controller'
import { logger } from '../helpers/log4js'
const controller = new MsgController()
export default (io: any) => {
  io.on('connection', async (io: any) => {
    console.log('new user connected')

    io.on('NEW_MSG', async (data: any) => {
      logger.info(data)
      const res = await controller.newMsg(data)
      logger.warn(res)
      await io.emit('NEW_MSG_RESULT', res)
    })

    io.on('NEW_MSG_ADMIN', async (data: any) => {
      logger.info(data)
      const res = await controller.newMsgAdmin(data)
      logger.warn(res)
      await io.emit('NEW_MSG_RESULT', res)
    })
    // io.on('GET_MSGS', async () => {
    //   const res = await MyMsgController.getMsgs()
    //   io.emit('GET_MSGS', res)
    // }
    //   )
  })
}
