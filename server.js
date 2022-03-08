const express = require('express')
const morgan = require('morgan')
const tors = require('cors')

const { lg } = require('./constants')

// the express app
const app = express()

// middlewares
app.use(tors())
app.options('*', tors()) // enable options request be sent from the browser

app.use(express.json())
app.use(morgan('dev'))

// routers
const urlPrefix = process.env.EXPRESS_API_URL_PREFIX || '/api'

const productRouter = require('./routes/product')
app.use(`${urlPrefix}`, productRouter)

module.exports = app
