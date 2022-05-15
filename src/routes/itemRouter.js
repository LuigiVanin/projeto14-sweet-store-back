import { Router } from "express";
import {
    getCategories,
    getItemByCategory,
    getItems,
} from "../controllers/itemController.js";
import { authentication } from "../middlewares/authentication.js";
import { categoryIdValidation } from "../middlewares/validation.js";

const itemRouter = Router();

itemRouter.get("/items", authentication, getItems);
itemRouter.get("/categories", authentication, getCategories);
itemRouter.get(
    "/categories/:categoryId",
    categoryIdValidation,
    authentication,
    getItemByCategory
);

export default itemRouter;
