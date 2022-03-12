const ck = require('chalk')
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
    ORDER: '/orders/:id',
}

// model string names
const MONGOOSE_MODEL_NAMES = {
    PRODUCT: 'Product',
    CATEGORY: 'Category',
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
        return res.status(statusCode).json(
            respObj
            //     {
            //     data: respObj,
            //     success: true,
            // }
        )
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
    MONGOOSE_MODEL_NAMES,

    blueBgWhite,
    redBgGray,

    responseBuilder,
}
