import mongoose, { ConnectOptions } from 'mongoose'
import { logger } from '../helpers/log4js'

// eslint-disable-next-line require-jsdoc
export async function getConnectionMongo () {
  try {
    // eslint-disable-next-line quotes
    await mongoose.connect(<string>process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)

    logger.info('MongoDB Connected')
  } catch (error) {
    logger.error(error)
    // TODO: Me parecio que cortar el proceso del servidor si no se podia conectar a la base de datos era una buena opcion
    process.exit(1)
  }
}
