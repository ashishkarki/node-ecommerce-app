const expressJwt = require('express-jwt')
const { COMPONENT_PATHS, COMPONENT_SUB_PATHS } = require('../constants')

const urlPrefix = process.env.EXPRESS_API_URL_PREFIX || '/api'

// the route guard type function
function authJwt() {
    return expressJwt({
        // the secret we used to sign our JWT
        // if the token is not signed with this secret, it will be rejected
        secret: process.env.JWT_SECRET,

        // what algorithms to use to verify the signature of the JWT
        // HS256 is used because 'JWT' package itself uses this algorithm
        algorithms: ['HS256'],
    }).unless({
        path: [
            // routes for specific methods only
            // {
            //     url: `${urlPrefix}${COMPONENT_PATHS.PRODUCTS}`,
            //     methods: ['GET', 'OPTIONS'],
            // },
            {
                url: /\/api\/v1\/ecommerce\/products(.*)/,
                methods: ['GET', 'OPTIONS'],
            },
            {
                url: /\/api\/v1\/ecommerce\/categories(.*)/,
                methods: ['GET', 'OPTIONS'],
            },

            // public routes that don't require authentication
            `${urlPrefix}${COMPONENT_PATHS.USERS}${COMPONENT_SUB_PATHS.LOGIN}`,
            `${urlPrefix}${COMPONENT_PATHS.USERS}${COMPONENT_SUB_PATHS.REGISTER}`,
        ],
    })
}

module.exports = authJwt
