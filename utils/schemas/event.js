const joi = require('joi');

const idEventSchema = joi.number();
const titleEventSchema = joi.string();
const descriptionEventSchema = joi.string();
const urlEventSchema = joi.string().uri();
const startDateEventSchema = joi.date();
const endDateEventSchema = joi.date();

const createEventSchema = {
    title: titleEventSchema.required(),
    description: descriptionEventSchema.required(),
    url: urlEventSchema,
    startDate: startDateEventSchema,
    endDate: endDateEventSchema
}

const updateEventSchema = {
    title: titleEventSchema,
    description: descriptionEventSchema,
    url: urlEventSchema,
    startDate: startDateEventSchema,
    endDate: endDateEventSchema
}

module.exports = {
    idEventSchema,
    createEventSchema,
    updateEventSchema
}