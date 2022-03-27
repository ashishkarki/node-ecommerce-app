const express = require('express')
const morgan = require('morgan')
const tors = require('cors')

const { COMPONENT_PATHS } = require('./constants')

// #the express app
const app = express()

// #Middlewares
app.use(tors())
app.options('*', tors()) // enable options request be sent from the browser

// enable reading of the request body as json
app.use(express.json())

// enable logging using 'morgan' package
app.use(morgan('dev'))

// express-jwt auth middleware
const authJwt = require('./helpers/jwt')
app.use(authJwt())
// also handle auth related errors this way:
// this fxn is only called if there is any error in our application
const errorHandler = require('./helpers/error-handler')
app.use(errorHandler)

// #Serve static files
app.use(express.static('public'))

// #Routers
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
