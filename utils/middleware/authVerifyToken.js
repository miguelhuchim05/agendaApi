const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../../config');

function authVerifyToken() {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            next(boom.unauthorized('Token is required'));

            return;
        }

        jwt.verify(token, config.secretKey, (err, user) => {
            if (err) {
                next(boom.unauthorized(err.message));

                return;
            }

            req.user = user;

            next()
        });
    }
}

module.exports = authVerifyToken;