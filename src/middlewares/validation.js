import { logInSchema } from "../helpers/schemas.js";

const logInValidation = (req, res, next) => {
    const validation = logInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message),
        });
    }
    next();
};

export { logInValidation };
