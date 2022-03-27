const { StatusCodes } = require('http-status-codes')
const { responseBuilder } = require('../constants')

function errorHandler(err, res, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return responseBuilder(res, StatusCodes.UNAUTHORIZED, [], true, {
            message: 'Error: check your Credentials!!',
        })
    } else if (err.name === 'ValidationError') {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: err.message,
        })
    } else {
        // default is 500 error
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            {
                message: 'Error: Something went wrong!!',
            }
        )
    }

    next()
}

module.exports = errorHandler
