import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { addAddress, callInfo, endShopping, getAddress } from "../controllers/successController.js";

const successRouter = Router();

successRouter.post("/success", authentication, addAddress);
successRouter.get("/success", authentication, callInfo);
successRouter.post("/conclude", authentication, endShopping);
successRouter.get("/conclude", authentication, getAddress)

export default successRouter;