import { describe, it } from 'mocha'

const request = require('supertest')('http://localhost:4000')
const expect = require('chai').expect
describe('User tests', () => {
  describe('SignUp', () => {
    it('Email is invalid - 400', async () => {
      const user = {
        name: 'John Doe',
        email: 'tobigpossetto',
        password: '123456',
        phone: '123456789',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)

    it('Phone is invalid - 400', async () => {
      const user = {
        name: 'John Doe',
        email: 'tobigpossetto@gmail.com',
        password: '123456',
        phone: '',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
    it('Name is empty - 400', async () => {
      const user = {
        name: '',
        email: 'tobigpossetto@gmail.com',
        password: '123456',
        phone: '98896896',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
    it('password is empty - 400', async () => {
      const user = {
        name: '',
        email: 'tobigpossetto@gmail.com',
        password: '',
        phone: '',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
    it('adress is empty - 400', async () => {
      const user = {
        name: 'asdasd',
        email: 'tobigpossetto@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
    it('Avatar is empty - 400', async () => {
      const user = {
        name: 'asdasd',
        email: 'tobigpossetto@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: 'Calle falsa 123'

      }
      const response = await request.post('/api/user/sign-up').send(user)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(10000)
  })
})
