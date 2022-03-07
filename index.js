const http = require('http')

const { lg, blueBgWhite } = require('./constants')

// configure env variables
const dotenv = require('dotenv/config')

// setup our server
const app = require('./server')

const server = http.createServer(app)

// db connection
const { connectToDB } = require('./db-connection')
connectToDB()

const PORT = process.env.PORT || 5001
server.listen(PORT, () => {
    lg(blueBgWhite(`Server listening on port ${PORT}`))
})
