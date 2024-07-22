const Joi = require("joi")

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    secondName: Joi.string().min(2).max(30).required(),
    age: Joi.number().min(0).required(),
    city: Joi.string().min(2)
});

module.exports = { userSchema }