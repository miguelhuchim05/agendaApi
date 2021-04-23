const express = require('express');
const AgendaService = require('../services/agenda');

// Schemas
const { idAgendaSchema, updateAgendaSchema } = require('../utils/schemas/agenda');

// Middlewares
const authVerifyToken = require('../utils/middleware/authVerifyToken');
const validationHanlder = require('../utils/middleware/validationHandler');

function agendaApi(app) {
    const router = express.Router();
    app.use('/api/agenda', router);

    const agendaService = new AgendaService();

    router.patch(
        '/:id',
        authVerifyToken(),
        validationHanlder( { id: idAgendaSchema }, 'params'),
        validationHanlder(updateAgendaSchema),
        async function (req, res, next) {
            try {
                const { id } = req.params;
                const agenda = req.body;

                const agendaUpdated = await agendaService.updateAgenda(agenda, id);

                return res.status(200).json({
                    message: 'Agenda updated',
                    data: agendaUpdated
                });
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = agendaApi;