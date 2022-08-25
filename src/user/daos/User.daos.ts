import { encryptPassword } from '../../helpers/encryptPassword'
import { logger } from '../../helpers/log4js'

import { OrderModel } from '../model/OrderModel'
import { UserModel } from '../model/User.model'
import { validPassword } from '../../helpers/validPassword'
export default class UserDaos {
  async checkIfEmailExist (email: string): Promise<boolean> {
    const result = await UserModel.findOne({ email })

    if (result) {
      return true
    } else {
      return false
    }
  }

  async checkPassword (user:{email:string, password:string}) {
    try {
      const res = await UserModel.findOne({ email: user.email })
      if (res) {
        const exist = await validPassword(user.password, res.password)
        if (exist) {
          return {
            error: false,
            data: {
              id: res.id,
              email: res.email,
              name: res.name,
              address: res.address,
              phone: res.phone,
              avatar: res.avatar
            }

          }
        } else {
          return {
            error: true,
            data: { message: 'Password incorrecto' }
          }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error verificando la contraseña' }
      }
    }
  }

  async findUserById (userId:any) {
    try {
      const user:any = await UserModel.findById(userId)
      if (user) {
        return {
          error: false,
          data: user
        }
      } else {
        return {
          error: true,
          data: { message: 'No se encontro el usuario' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async createUser (userData: any): Promise<any> {
    try {
      userData.password = await encryptPassword(userData.password)

      try {
        const user = new UserModel(userData)
        const result = await user.save()
        return {
          error: false,
          data: result
        }
      } catch (error) {
        logger.error(error)
        return {
          error: true,
          data: { message: 'Ocurrio un error guardando al usuario' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error creando al usuario' }
      }
    }
  }

  async saveNewOrder (order:any):Promise<{error:Boolean, data:any}> {
    try {
      const newOrder = new OrderModel(order)

      try {
        const result = await newOrder.save()
        return {
          error: false,
          data: result._id
        }
      } catch (error) {
        logger.error(error)
        return {
          error: true,
          data: { message: 'Ocurrio un error guardando la orden' }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error guardando el pedido en la base de datos' }
      }
    }
  }
}
