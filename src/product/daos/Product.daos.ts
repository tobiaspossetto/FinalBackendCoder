import { Iproduct } from '../../../types/producTypes'
import { logger } from '../../helpers/log4js'
import { ProductModel } from '../model/ProductModel'

export default class ProductDaos {
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

  async updateProduct (newProduct:Iproduct, id:string) {
    try {
      const res = await ProductModel.findOneAndUpdate({ _id: id }, { $set: { ...newProduct } })
      logger.info(id)
      if (res == null) {
        logger.error(res)
        return {
          error: true,
          data: { message: 'El producto no se pudo actualizar' }
        }
      } else {
        return {
          error: false,
          data: { id: res._id }
        }
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error actualizando el producto en la base de datos' }
      }
    }
  }

  async deleteProduct (id:string) {
    try {
      await ProductModel.findOneAndDelete({ _id: id })
      return {
        error: false,
        data: 'ok'
      }
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error borrando el producto en la base de datos' }
      }
    }
  }

  // Para chequear si los productos del carrito existen
  async findProductsCart (cart:any) {
    try {
      const prods = await ProductModel.find({
        _id: {
          $in: cart.map((item: { productId: any }) => item.productId)
        }
      })
      if (cart.length !== prods.length) {
        return {
          error: true,
          data: { message: 'Al menos un producto no se encontro' }
        }
      }
      return { error: false, data: prods }
    } catch (error) {
      return {
        error: true,
        data: { message: 'No se encuentran los productos seleccionados' }
      }
    }
  }
}
