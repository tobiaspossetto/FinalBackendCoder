import { describe, it } from 'mocha'

const request = require('supertest')('http://localhost:4000')
const expect = require('chai').expect
describe('Products test', () => {
  describe('List all products', () => {
    it('list products successfully - code 200', async () => {
      const response = await request.get('/api/products')
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
  })

  describe('List products by category', () => {
    it('list products by category successfully - code 200 - products[]', async () => {
      const response = await request.get('/api/products/cat/1')
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
    it('list products by category that does not exist - code 200 - products[]', async () => {
      const response = await request.get('/api/products/cat/23')
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
  })

  describe('List products by id', () => {
    it('list products by id successfully - code 200 - product[]', async () => {
      const response = await request.get('/api/products/62d56f9507edfe50058fb127')
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('object')
    }).timeout(10000)
    it('list products by id that does not exist - code 404 - message', async () => {
      const response = await request.get('/api/products/23')
      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('object')
    }).timeout(10000)
  })
})
