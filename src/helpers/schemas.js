import Joi from "joi";

const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export { logInSchema };
