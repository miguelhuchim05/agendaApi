const express = require('express');
const AuthService = require('../services/auth');
const authHandler = require('../utils/middleware/authHandler');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    const authService = new AuthService();

    router.post(
        '/sign-in',
        authHandler(),
        async function (req, res, next) {
            try {
                const user = req.user;
                const token = await authService.getToken(user);

                res.status(200).json({
                    message: '',
                    data: {
                        token
                    }
                });
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = authApi;
