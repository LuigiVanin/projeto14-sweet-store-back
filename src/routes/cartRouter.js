import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { addToCart, callFromCart, updateValue } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", authentication, addToCart);
cartRouter.get("/cart", authentication, callFromCart);
cartRouter.put("/cart", authentication, updateValue);

export default cartRouter;