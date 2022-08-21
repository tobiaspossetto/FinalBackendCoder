import { Iproduct } from '../../types/producTypes'
import { logger } from '../helpers/log4js'

import ProductPersistense from '../persistence/Product.persistence'
const persistence = new ProductPersistense()
export default class ProductsService {
  async getAllProducts () {
    try {
      const products: any = await persistence.getAllProducts()

      return products
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async getProductsByCategory (cat: string) {
    try {
      const products: any = await persistence.getByCategory(cat)
      if (products.error) {
        return {
          error: true,
          data: { message: products.data.message }
        }
      } else {
        if (products.data.length === 0) {
          return {
            error: true,
            data: {
              message:
                'No hay productos que coincidan con la categoria seleccionada'
            }
          }
        } else {
          return products
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

  async getProductsById (id: string) {
    try {
      const product: any = await persistence.getById(id)
      return product
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: { message: 'Ocurrio un error interno' }
      }
    }
  }

  async createProduct (prod: Iproduct) {
    try {
      const result = await persistence.createProduct(prod)
      return result
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: { message: 'Ocurrio un error creando el producto' }
      }
    }
  }
}
