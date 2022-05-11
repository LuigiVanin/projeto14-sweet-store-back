import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).send({ message: "usuário inexistente" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ message: "senha está incorreta" });
        }
        const payload = { email, id: user._id.toString() };
        const token = jwt.sign(payload, process.env.JWT_KEY);
        return res.status(200).send({ email, name: user.name, token });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
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
