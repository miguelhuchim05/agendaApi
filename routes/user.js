const express = require('express');
const UserService = require('../services/user');

// Schemas
const { idUserSchema, createUserSchema } = require('../utils/schemas/user');

// Middlewares
const authVerifyToken = require('../utils/middleware/authVerifyToken');
const validationHanlder = require('../utils/middleware/validationHandler');

function userApi(app) {
    const router = express.Router();
    app.use('/api/user', router);

    const userService = new UserService();

    router.get(
        '/',
        authVerifyToken(),
        async function (req, res, next) {
            try {
                const users = await userService.getUsers();

                res.status(200).json({
                    message: '',
                    data: users
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idUserSchema }, 'params'),
        async function (req, res, next) {
            try {
                const { id } = req.params;

                const user = await userService.getUserById(id);

                res.status(200).json({
                    message: '',
                    data: user
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        '/',
        authVerifyToken(),
        validationHanlder(createUserSchema),
        async function (req, res, next) {
            try {
                const user = req.body;

                const userCreated = await userService.createUser(user);

                res.status(201).json({
                    message: 'User created',
                    data: userCreated
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idUserSchema }, 'params'),
        async function (req, res, next) {
            try {
                const { id } = req.params;

                await userService.deleteUser(id);

                res.sendStatus(204);
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = userApi;
