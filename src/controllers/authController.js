import db from "../database.js";
import bcrypt from 'bcrypt';

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

const signUp = async (req, res) => {
    const {name, email, password, cardNumber, cardCode, cardExpire, cardName, cardType} = req.body

    try {
        const user = await db.collection("users").findOne({email});

        if (user) {
            res.status(409).send("Usuário já existe");
        }

        await db.collection("users").insertOne({
            name,
            email,
            password: bcrypt.hashSync(password, Number(process.env.KEY)),
            cardNumber,
            cardCode,
            cardExpire,
            cardName,
            cardType
        });

        return res.status(201).send("Usuário criado com sucesso!");

    } catch (error) {
        console.log("Erro ao cadastrar usuário");
        return res.sendStatus(500)
    }
};


export { logIn, signUp };
