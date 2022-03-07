const ck = require('chalk')
const lg = console.log

// chalk formatters
const blueBgWhite = ck.blue.bgWhiteBright
const redBgGray = ck.red.bgGray

const responseBuilder = (
    res = {},
    statusCode = StatusCodes.OK,
    respObj = [],
    isError = false,
    errObj = {}
) => {
    if (!isError) {
        return res.status(statusCode).json({
            data: respObj,
            success: true,
        })
    } else {
        return res.status(statusCode).json({
            error: errObj.message,
            success: false,
        })
    }
}

module.exports = {
    ck,
    lg,

    blueBgWhite,
    redBgGray,

    responseBuilder,
}
