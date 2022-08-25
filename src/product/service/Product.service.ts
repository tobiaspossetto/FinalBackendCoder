import { Iproduct } from '../../../types/producTypes'
import { logger } from '../../helpers/log4js'

import ProductDaos from '../daos/Product.daos'
const daos = new ProductDaos()
export default class ProductsService {
  async getAllProducts () {
    try {
      const products: any = await daos.getAllProducts()

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
      const products: any = await daos.getByCategory(cat)
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
      const product: any = await daos.getById(id)
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
      const result = await daos.createProduct(prod)
      return result
    } catch (error) {
      logger.error(error)
      return {
        error: true,

        data: { message: 'Ocurrio un error creando el producto' }
      }
    }
  }

  async updateProduct (prod:Iproduct, id:string) {
    try {
      const prodToUpdate = await daos.getById(id)
      if (prodToUpdate.error) {
        return prodToUpdate
      }

      const result = await daos.updateProduct(prod, prodToUpdate.data._id)
      return result
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error intentando actualizar el producto' }
      }
    }
  }

  async deleteProduct (id:string) {
    try {
      const prodToDeleteExist = await daos.getById(id)
      if (prodToDeleteExist.error) {
        return prodToDeleteExist
      }
      const result = await daos.deleteProduct(id)
      return result
    } catch (error) {
      logger.error(error)
      return {
        error: true,
        data: { message: 'Ocurrio un error intentando eliminar el producto' }
      }
    }
  }
}
