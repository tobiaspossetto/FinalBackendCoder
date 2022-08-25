import { logger } from '../../helpers/log4js'
import dotenv from 'dotenv'
import { IdataUserRegistration } from '../../../types/userTypes'
import UserDaos from '../daos/User.daos'
import { createToken } from '../../middlewares/jwt'
import { EmailAdminUserRegister, EmailOrderAdmin, EmailOrderUser, EmailUserRegister } from '../service/Notifications.service'
import ProductDaos from '../../product/daos/Product.daos'
const productsDaos = new ProductDaos()
const daos = new UserDaos()
dotenv.config()
export default class UserService {
  async signIn (data:{email:string, password:string}):Promise<{error:Boolean, data:any}> {
    const userExist = await daos.checkIfEmailExist(data.email)
    if (!userExist) {
      return {
        error: true,
        data: { message: 'El usuario no se encontro' }
      }
    }
    const userChecked = await daos.checkPassword({ email: data.email, password: data.password })
    if (userChecked?.error) {
      return {
        error: true,
        data: { message: userChecked.data?.message }
      }
    }

    const token = createToken(userChecked?.data)

    return {
      error: false,
      data: {
        token,
        user: userChecked?.data.name,
        id: userChecked?.data.id,
        email: userChecked?.data.email,
        address: userChecked?.data.address,
        phone: userChecked?.data.phone,
        avatar: userChecked?.data.avatar

      }
    }
  }

  async signUp (userData: IdataUserRegistration):Promise<{error:Boolean, data:any}> {
    const exist = await daos.checkIfEmailExist(userData.email)
    if (exist) {
      logger.info('El usuario ya existe')
      return {
        error: true,
        data: {
          message: 'El email ya es utilizado'
        }
      }
    }

    try {
      const saved = await daos.createUser(userData)
      if (saved.error) {
        return {
          error: true,
          data: { message: saved.data.message }
        }
      }

      // * ENVIO DE CORREO DE NOTIFICACION AL ADMIN
      await EmailAdminUserRegister({
        name: saved.data.name, address: saved.data.address, phone: saved.data.phone

      })
      // * ENVIO DE CORREO DE NOTIFICACION AL USUARIO
      await EmailUserRegister(saved.data.email)
      return {
        error: false,

        data: {
          message: 'Usuario registrado con exito'

        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: {
          message: 'Fallo interno al registrar usuario'

        }
      }
    }
  }

  async createOrder (userId:string, cart:{productId:string, quantity:number}[]):Promise<{error:Boolean, data:any}> {
    try {
      const user = await daos.findUserById(userId)
      if (user.error) {
        return user
      }
      const prods:any = await productsDaos.findProductsCart(cart)

      if (prods.error) {
        return prods
      }
      // @ts-ignore
      const finalProducts = prods.data.map(item => {
        return {
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cart.find(i => i.productId === item._id.toString())?.quantity

        }
      }
      )

      const order = {
        user: {

          _id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          address: user.data.address,
          phone: user.data.phone
        },
        products: finalProducts,
        totalPrice: finalProducts.reduce((acc:any, cur:any) => acc + cur.price * cur.quantity, 0),
        totalItems: cart.reduce((acc, cur) => acc + cur.quantity, 0)

      }
      const saved = await daos.saveNewOrder(order)
      if (saved.error) {
        return saved
      }

      EmailOrderAdmin(order, saved.data._id)

      EmailOrderUser(
        order.user.email,
        order, saved.data._id
      )

      return {
        error: false,
        data: {
          message: 'Pedido realizado con exito',
          orderId: saved.data._id
        }
      }
    } catch (error) {
      logger.error(error)
      return ({
        error: true,
        data: { message: 'Ocurrio un error interno' }
      })
    }
  }
}
