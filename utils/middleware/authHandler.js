const boom = require('@hapi/boom');

function authHandler() {
    return function (req, res, next) {
        const auth = req.headers['authorization'];

        if (!auth) { return next(boom.unauthorized('Missing user or password')); }

        const credentialsBase64 = auth.split(' ')[1];
        const plainTextCredentials = Buffer.from(credentialsBase64, 'base64').toString();
        const credentials = plainTextCredentials.split(':');

        req.user = {
            email: credentials[0],
            password: credentials[1]
        };

        next();
    }
}

module.exports = authHandler;