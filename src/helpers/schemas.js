import Joi from "joi";

const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(), // vai deixar a senha sendo só string mesmo?
});

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmedPassword: Joi.string().equal(Joi.ref("password")).required(),
    cardNumber: Joi.number().required(),
    cardCode: Joi.number().required(),
    cardExpire: Joi.string().required(),
    cardName: Joi.string().required(),
    cardType: Joi.string().valid("debit", "credit").required(),
});

const categoryIdSchema = Joi.number().integer().required();

export { logInSchema, signUpSchema, categoryIdSchema };
