const express = require('express');
const EventService = require('../services/event');

// Schemas
const { idEventSchema, createEventSchema, updateEventSchema } = require('../utils/schemas/event');

// Middlewares
const authVerifyToken = require('../utils/middleware/authVerifyToken');
const validationHanlder = require('../utils/middleware/validationHandler');

function eventApi(app) {
    const router = express.Router();
    app.use('/api/event', router);

    const eventService = new EventService();

    /**
     * Path to list all events of the logged in user.
     */
    router.get(
        '/',
        authVerifyToken(),
        async function (req, res, next) {
            try {
                const userId = req.user.id;
                const events = await eventService.getEvents(userId);

                res.status(200).json({
                    message: '',
                    data: events
                });
            } catch (error) {
                next(error);
            }
        }
    );

    /**
     * Path to display an event of the logged in user.
     */
    router.get(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idEventSchema }, 'params'),
        async function (req, res, next) {
            try {
                const userId = req.user.id;
                const { id } = req.params;

                const eventRetrieved = await eventService.getEventById(id, userId);

                res.status(200).json({
                    message: '',
                    data: eventRetrieved
                });
            } catch (error) {
                next(error);
            }
        }
    );

    /**
     * Path to create an event for the logged in user when his agenda is not locked.
     */
    router.post(
        '/',
        authVerifyToken(),
        validationHanlder(createEventSchema),
        async function (req, res, next) {
            try {
                const eventBody = req.body;
                eventBody.userId = req.user.id;

                const eventCreated = await eventService.createEvent(eventBody);

                res.status(201).json({
                    message: 'Event created',
                    data: eventCreated
                });
            } catch (error) {
                next(error);
            }
        }
    );

    /**
     * Path to update an event of the logged in user.
     */
    router.patch(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idEventSchema }, 'params'),
        validationHanlder(updateEventSchema),
        async function (req, res, next) {
            try {
                const userId = req.user.id;
                const { id } = req.params;
                const eventBody = req.body;

                const eventCreated = await eventService.updateEvent(eventBody, id, userId);

                res.status(200).json({
                    message: 'Event updated',
                    data: eventCreated
                });
            } catch (error) {
                next(error);
            }
        }
    );

    /**
     * Path to update an event of the logged in user.
     */
    router.delete(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idEventSchema }, 'params'),
        async function (req, res, next) {
            try {
                const userId = req.user.id;
                const { id } = req.params;

                await eventService.deleteEvent(id, userId);

                res.sendStatus(204);
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = eventApi;
