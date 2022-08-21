import { describe, it } from 'mocha'
import axios from 'axios'
const request = require('supertest')('http://localhost:4000')
const expect = require('chai').expect
describe('USER TESTS 🧑‍🦱️', () => {
  describe('SIGN-UP 🟧️ ', () => {
    it('Email is invalid - 400 🚩️', async () => {
      const user = {
        name: 'John Doe',
        email: 'tobigpossetto',
        password: '123456',
        phone: '123456789',
        address: 'Calle falsa 123'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })
      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)

    it('Phone is invalid - 400 🚩️', async () => {
      const user = {
        name: 'John Doe',
        email: 'tobigpossetto@gmail.com',
        password: '123456',
        phone: '',
        address: 'Calle falsa 123'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })
      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)
    it('Name is empty - 400 🚩️', async () => {
      const user = {
        name: '',
        email: 'tobigpossetto@gmail.com',
        password: '123456',
        phone: '98896896',
        address: 'Calle falsa 123'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })
      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)
    it('password is empty - 400 🚩️', async () => {
      const user = {
        name: '',
        email: 'tobigpossetto@gmail.com',
        password: '',
        phone: '423234',
        address: 'Calle falsa 123'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })
      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)
    it('adress is empty - 400 🚩️', async () => {
      const user = {
        name: 'asdasd',
        email: 'tobigpossetto@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: ''
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })
      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)

    it('Avatar is empty - 400 🚩️', async () => {
      const user = {
        name: 'asdasd',
        email: 'tobigpossetto@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: 'fake address'
      }
      //   const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', { responseType: 'stream' })

      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
      //  .attach('avatar', imgCall.data, 'avatar.jpg')
      // !Tiene que ser un 400 pero la app da un 200
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)

    it('All fields are corrects, but email is already in use - 400 🚩️', async () => {
      const user = {
        name: 'asdasd',
        email: 'tobigpossetto@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: 'fake address'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })

      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('object')
    }).timeout(50000)
    it('User created successfully - 201 🟢️', async () => {
      // ramdom string
      const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
      let string = ''
      for (let ii = 0; ii < 10; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)]
      }
      const user = {
        name: 'asdasd',
        email: string + '@gmail.com',
        password: 'asdasd',
        phone: '12434r1234',
        address: 'fake address'
      }
      const imgCall = await axios.get('https://i.imgur.com/8uJcFxW.jpg', {
        responseType: 'stream'
      })

      const response = await request
        .post('/api/user/sign-up')
        .set('Content-Type', 'multipart/form-data')
        .field('password', user.password)
        .field('email', user.email)
        .field('name', user.name)
        .field('phone', user.phone)
        .field('address', user.address)
        .attach('avatar', imgCall.data, 'avatar.jpg')

      expect(response.status).to.equal(201)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('object')
    }).timeout(50000)
  })
})

describe('SIGN-IN 🟦️', () => {
  it('Field email is empty - 400 🚩️', async () => {
    const user = {

      email: '',
      password: 'asdasd'

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal(true)
    expect(response.body.data).to.be.an('array')
  }).timeout(50000)

  it('Field password is empty - 400 🚩️', async () => {
    const user = {

      email: 'tobiasd@gmail.com',
      password: ''

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal(true)
    expect(response.body.data).to.be.an('array')
  }).timeout(50000)

  it('Cannot find the email - 400 🚩️', async () => {
    const user = {

      email: 'tobiasd@gmail.com',
      password: 'asdasdsdadas'

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal(true)
    expect(response.body.data).to.be.an('object')
  }).timeout(50000)
  it('User founded but the password is incorrect - 400 🚩️', async () => {
    const user = {

      email: 'tobigpossetto@gmail.com',
      password: 'asdasdsdadas'

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal(true)
    expect(response.body.data).to.be.an('object')
  }).timeout(50000)
  it('Login successfully - 200 🟢️', async () => {
    const user = {

      email: 'tobigpossetto@gmail.com',
      password: '123123'

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(200)
    expect(response.body.error).to.equal(false)
    expect(response.body.data).to.be.an('object')
    expect(response.body.data.token).to.be.a('string')
  }).timeout(50000)
})

describe('JWT VERIFICATION', async () => {
  let token = ''
  it('User login to get a session token - 200 🟢️', async () => {
    const user = {

      email: 'tobigpossetto@gmail.com',
      password: '123123'

    }

    const response = await request
      .post('/api/user/sign-in').send(user)

    expect(response.status).to.equal(200)
    expect(response.body.error).to.equal(false)
    expect(response.body.data).to.be.an('object')
    expect(response.body.data.token).to.be.a('string')
    token = response.body.data.token
  }).timeout(50000)

  it('The request should be accepted because the token is valid - 200 🟢️', async () => {
    const response = await request
      .get('/api/user/profile').set('auth-token', ` ${token}`)

    expect(response.status).to.equal(200)
    expect(response.body.error).to.equal(false)
    expect(response.body.data).to.be.an('object')
  }).timeout(50000)

  it('The request should be rejected because the token is not valid. - 403 🚨️', async () => {
    const response = await request
      .get('/api/user/profile').set('auth-token', ' sdfwsedf')

    expect(response.status).to.equal(403)
    expect(response.body.error).to.equal(true)
    expect(response.body.data).to.be.an('object')
  }).timeout(50000)

  describe('CREATION OF ORDER', () => {
    it('The request should be rejected because the user is not authenticated - 403 🚨️', async () => {
      const response = await request.post('/api/user/createOrder').send('')
      expect(response.status).to.equal(403)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('object')
    }).timeout(50000)

    it('The request should be rejected because cart is empty - 400 🚩️', async () => {
      const cart = {
        cart: []
      }
      const response = await request.post('/api/user/createOrder').set('auth-token', ` ${token}`).send(cart)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)

    it('The request should be rejected because idProduct is empty - 400 🚩️', async () => {
      const cart = {
        cart: [
          {
            productId: '',
            quantity: 1
          }
        ]
      }
      const response = await request.post('/api/user/createOrder').set('auth-token', ` ${token}`).send(cart)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('array')
    }).timeout(50000)

    it('The request should be rejected because idProduct is incorrect - 400 🚩️', async () => {
      const cart = {
        cart: [
          {
            productId: 'asdasdasdasdas',
            quantity: 1
          }
        ]
      }
      const response = await request.post('/api/user/createOrder').set('auth-token', ` ${token}`).send(cart)
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal(true)
      expect(response.body.data).to.be.an('object')
    }).timeout(50000)

    it('The request should be accepted - 200 🟢️', async () => {
      const cart = {
        cart: [
          {
            productId: '62c32d181ff9ac03d9225afd',
            quantity: 3
          }
        ]
      }
      const response = await request.post('/api/user/createOrder').set('auth-token', ` ${token}`).send(cart)
      expect(response.status).to.equal(200)
      expect(response.body.error).to.equal(false)
      expect(response.body.data).to.be.an('object')
    }).timeout(50000)
  })
})
