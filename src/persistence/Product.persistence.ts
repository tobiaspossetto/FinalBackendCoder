import { Iproduct } from '../../types/producTypes'
import { logger } from '../helpers/log4js'
import { ProductModel } from '../Models/ProductModel'

export default class ProductPersistense {
  async getAllProducts () {
    try {
      const res = await ProductModel.find({})
      return { error: false, data: res }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno consultando a la base de datos' }
      }
    }
  }

  async getByCategory (category:string) {
    try {
      const result = await ProductModel.find({ category })
      if (result == null) {
        return {
          error: true,
          data: { message: 'Ocurrio un error interno consultando a la base de datos' }
        }
      } else {
        return {
          error: false,
          data: result
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error interno consultando a la base de datos' }
      }
    }
  }

  async getById (id:string) {
    try {
      const product:any = await ProductModel.findById(id)
      if (product == null) {
        return {
          error: true,
          data: { message: 'El producto no se encontro' }
        }
      } else {
        return {
          error: false,
          data: product
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error, asegurese de que el id es correcto' }
      }
    }
  }

  async createProduct (product:Iproduct) {
    try {
      const newProduct = new ProductModel(product)
      const result = await newProduct.save()
      if (result == null) {
        return {
          error: true,
          data: { message: 'El producto no se pudo crear' }
        }
      } else {
        return {
          error: false,
          data: { id: result._id }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error guardando el producto en la base de datos' }
      }
    }
  }
}
