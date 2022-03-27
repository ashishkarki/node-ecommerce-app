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

        // revoke the token, unders certain circumstances
        isRevoked: isRevoked,
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

/**
 * [Bit extreme] Revoke the token if anyone other than an Admin tries to access a protected route
 *
 * @param req The express request object.
 * @param payload data inside the token
 * @param done A function with signature function(err, revoked) to be invoked once the check to see if the token is revoked or not is complete revoked is true if this JWT token has been revoked
 */
const isRevoked = async (req, payload, done) => {
    if (!payload.isAdmin) {
        done(null, true) // send 'null' as the new token and 'true' as the revoked status
    }

    done() // send an empty done if the token is not revoked
}

module.exports = authJwt
