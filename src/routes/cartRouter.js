import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { addToCart, callFromCart } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", authentication, addToCart);
cartRouter.get("/cart", authentication, callFromCart);

export default cartRouter;