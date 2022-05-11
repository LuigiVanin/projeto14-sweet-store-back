import { logIn } from "../controllers/authController.js";
import { logInValidation } from "../middlewares/validation.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", logInValidation, logIn);

export default authRouter;
