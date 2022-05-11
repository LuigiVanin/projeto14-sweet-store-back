import { logIn, signUp } from "../controllers/authController.js";
import { logInValidation, signUpValidation } from "../middlewares/validation.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", logInValidation, logIn);
authRouter.post("/sign-up", signUpValidation, signUp);

export default authRouter;
