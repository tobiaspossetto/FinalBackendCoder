import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import minimist from 'minimist'

import userRouter from './user/router/User.router'
import { getConnectionMongo } from './db/mongoConnection'

import morgan from 'morgan'
import productsRouter from './product/router/Products.router'

import bodyParser from 'body-parser'
dotenv.config()
const app = express()

export const args = minimist(process.argv.slice(2))

export const PORT = args._[0] || process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

getConnectionMongo()

app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)
export default app
