import db from "../database.js";

const logIn = async (req, res) => {
    console.log(req.body);

    try {
        const busca = await db.collection("users").find({}).toArray();
        console.log(busca);
        return res.status(200).send({ message: "ok" });
    } catch {
        console.log("something is in the way");
    }
};

export { logIn };
