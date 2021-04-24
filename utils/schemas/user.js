const joi = require('joi');

const idUserSchema = joi.number();
const nameUserSchema = joi.string();
const emailUserSchema = joi.string();
const passwordUserSchema = joi.string();

const createUserSchema = {
    name: nameUserSchema,
    email: emailUserSchema,
    password: passwordUserSchema
}

module.exports = {
    idUserSchema,
    createUserSchema
}