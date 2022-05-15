import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { addToCart } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", authentication, addToCart);

export default cartRouter;