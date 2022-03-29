const ck = require('chalk')
const { StatusCodes } = require('http-status-codes')
const lg = console.log

// chalk formatters
const blueBgWhite = ck.blue.bgWhiteBright
const redBgGray = ck.red.bgGray

// sub-paths
const COMPONENT_PATHS = {
    HOME: '/',

    PRODUCTS: '/products',
    PRODUCT: '/products/:id',

    CATEGORIES: '/categories',
    CATEGORY: '/categories/:id',

    USERS: '/users',
    USER: '/users/:id',

    ORDER: '/orders/:id',
}
const COMPONENT_SUB_PATHS = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
}

// model string names
const MONGOOSE_MODEL_NAMES = {
    PRODUCT: 'Product',
    CATEGORY: 'Category',
    USER: 'User',
}

// functions
const responseBuilder = (
    res = {},
    statusCode = StatusCodes.OK,
    respObj = [],
    isError = false,
    errObj = {}
) => {
    if (!isError) {
        return res.status(statusCode).json(respObj)
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

    COMPONENT_PATHS,
    COMPONENT_SUB_PATHS,
    MONGOOSE_MODEL_NAMES,

    blueBgWhite,
    redBgGray,

    responseBuilder,
}
