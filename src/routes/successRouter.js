import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { addAddress, callInfo, endShopping } from "../controllers/successController.js";

const cartRouter = Router();

cartRouter.post("/success", authentication, addAddress);
cartRouter.get("/success", authentication, callInfo);
cartRouter.post("/conclude", authentication, endShopping)

export default cartRouter;