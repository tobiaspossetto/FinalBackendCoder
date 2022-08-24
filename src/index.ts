import http from 'http'
import app, { PORT, args } from './app'
import cluster from 'cluster'
import { logger } from './helpers/log4js'
import sockets from './routes/Msg.router'
const socketIo = require('socket.io')
const numCPUs = require('os').cpus().length

if (args._[1] === 'CLUSTER' && cluster.isMaster) {
  logger.info(`I am a master ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', function (worker, code, signal) {
    logger.info('worker ' + worker.process.pid + ' died')
  })
} else {
  const server = http.createServer(app)

  // conexion con socket
  const httpServer = server.listen(PORT)
  const io = socketIo(server, { cors: { origin: '*' } }) // you can change the cors to your own domain
  // io.on('connection', (socket: { on: (arg0: string, arg1: () => void) => void }) => {
  //   logger.info('a user connected')

  //   socket.on('disconnect', () => {
  //     logger.info('user disconnected')
  //   })
  // })
  sockets(io)
  logger.info('💯️ Server on port', PORT)
}
