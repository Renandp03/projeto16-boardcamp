import Joi from "joi";

export const gameSchema = Joi.object({
    name:Joi.string().min(1).required(),
    image:Joi.string(),
    stockTotal:Joi.number().min(0).required(),
    pricePerDay:Joi.number().min(0).required()
})