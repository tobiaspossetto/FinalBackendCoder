import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import minimist from 'minimist'
import routerViews from './routes/ViewsRoute'

import userRouter from './routes/User.router'
import { getConnectionMongo } from './db/mongoConnection'

import morgan from 'morgan'
import productsRouter from './routes/Products.router'

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

app.set('views', './src/public/views')
app.set('view engine', 'pug')

app.use('/', routerViews)
app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)
export default app
