const boom = require('@hapi/boom');
const { config } = require('../../config');

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        console.log('No es boom');
        next(boom.badImplementation(err));

        return;
    }

    console.log('Es boom');
    next(err);
}

function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

function withErrorStack(error, stack) {
    if (config.dev) {
        return { ...error, stack };
    }

    return error;
}

module.exports = {
    wrapErrors,
    errorHandler
}
