import Joi from "joi";

export const customerSchema = Joi.object({
    name:Joi.string().min(3).required(),
    phone:Joi.string().min(10).max(11),
    cpf:Joi.string().min(11).max(11),
    birthday:Joi.string().min(10).max(10)
})

