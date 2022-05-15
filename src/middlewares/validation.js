import {
    categoryIdSchema,
    logInSchema,
    signUpSchema,
} from "../helpers/schemas.js";

const logInValidation = (req, res, next) => {
    const validation = logInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message),
        });
    }
    next();
};

const signUpValidation = (req, res, next) => {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message),
        });
    }
    next();
};

const categoryIdValidation = (req, res, next) => {
    const validation = categoryIdSchema.validate(req.params.categoryId);
    if (validation.error) {
        return res.status(422).send({ message: "Id invalido!" });
    }

    next();
};

export { logInValidation, signUpValidation, categoryIdValidation };
