const joi = require('joi');

const idAgendaSchema = joi.number();
const lockAgendaSchema = joi.boolean();

const updateAgendaSchema = {
    lock: lockAgendaSchema
}

module.exports = {
    idAgendaSchema,
    updateAgendaSchema
}