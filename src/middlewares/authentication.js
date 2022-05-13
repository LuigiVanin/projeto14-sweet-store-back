import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import db from "../database.js";

const authentication = async (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
        return res.status(422).send({ message: "token inexistente" });
    }
    authorization = authorization.replace("Bearer", "").trim();
    console.log(authorization);
    try {
        const { id, iat } = jwt.verify(authorization, process.env.JWT_KEY);
        const timeNowInSeconds = Date.now() / 1000;
        console.log(timeNowInSeconds - iat);
        if (timeNowInSeconds - iat > 15 * 60) {
            return res.status(401).send({ message: "your token is too old!" });
        }
        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(id) });
        delete user.password;
        res.locals.user = user;
    } catch (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "incorrect token" });
        } else {
            return res.sendStatus(500);
        }
    }

    next();
};

export { authentication };
