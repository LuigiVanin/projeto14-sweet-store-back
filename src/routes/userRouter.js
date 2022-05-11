import { Router } from "express";
import { getPaymentMethod, getUser } from "../controllers/userController.js";
import { authentication } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.get("/user", authentication, getUser);
userRouter.get("/payment", authentication, getPaymentMethod);

export default userRouter;
