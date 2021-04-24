const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../config');
const { User } = require('../lib/sequelize');

class AuthService {
    async getToken(user) {
        const userRetrieved = await User.findOne({
            where: {
                email: user.email
            }
        });

        if (!userRetrieved) { throw boom.unauthorized('Account not found'); }
        if (userRetrieved.password !== user.password) { throw boom.unauthorized('Wrong username or password”'); }

        user.id = userRetrieved.id;

        return jwt.sign(user, config.secretKey, { expiresIn: '1h' });
    }
}

module.exports = AuthService;
