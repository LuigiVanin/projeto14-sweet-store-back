import { Router } from "express";
import { getCategories, getItems } from "../controllers/itemController.js";
import { authentication } from "../middlewares/authentication.js";

const itemRouter = Router();

itemRouter.get("/items", authentication, getItems);
itemRouter.get("/categories", authentication, getCategories);

export default itemRouter;
