const express = require('express')
const morgan = require('morgan')
const tors = require('cors')

const { lg, COMPONENT_PATHS } = require('./constants')

// the express app
const app = express()

// middlewares
app.use(tors())
app.options('*', tors()) // enable options request be sent from the browser

app.use(express.json())
app.use(morgan('dev'))

// serve static files
app.use(express.static('public'))

// routers
const urlPrefix = process.env.EXPRESS_API_URL_PREFIX || '/api'

// product router
const productRouter = require('./routes/product')
const productRoute = `${urlPrefix}${COMPONENT_PATHS.PRODUCTS}`
app.use(productRoute, productRouter)

// category router
const categoryRouter = require('./routes/categories')
const categoryRoute = `${urlPrefix}${COMPONENT_PATHS.CATEGORIES}`
app.use(categoryRoute, categoryRouter)

// user router
const userRouter = require('./routes/user')
const userRoute = `${urlPrefix}${COMPONENT_PATHS.USERS}`
app.use(userRoute, userRouter)

module.exports = app
