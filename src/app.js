import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import itemRouter from "./routes/itemRouter.js";
import cartRouter from "./routes/cartRouter.js";
import successRouter from "./routes/successRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(userRouter);
app.use(itemRouter);
app.use(cartRouter);
app.use(successRouter);

export default app;
