import Joi from "joi";
import dayjs from 'dayjs';

const date = dayjs().format("MM/YYYY");

const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),  // vai deixar a senha sendo só string mesmo?
});

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmedPassword: Joi.string().ref('password').required(),
    cardNumber: Joi.number().min(16).max(16).required(),
    cardCode: Joi.number().min(3).max(3).required(),
    cardExpire: Joi.date().greater(date),
    cardName: Joi.string().required(),
    cardType: Joi.string().valid("debit", "credit").required()
});

export { logInSchema, signUpSchema };
