import db from "../database.js";

const addAddress = async (req, res) => {
    const { email } = res.locals.user;
    const body = req.body;
    console.log(body)

    try {

        const addressInfo = await db.collection("address").findOne({email});

        if(!addressInfo) {
            await db.collection("address").insertOne(body);
        }      

        res.status(200).send("Informações de endereço adicionadas na coleção");

    } catch (error) {

        console.log(error);
        res.send("Não foi possível adicionar o endereço na coleção");

    }
}

const callInfo = async (req, res) => {
    const { email } = res.locals.user;

    try {
        const info = await db.collection("carts").find({email}).toArray();
        console.log(info)
        res.status(200).send(info);
    } catch (error) {
        res.sendStatus(500)
    }
}

const endShopping = async (req, res) => {
    const { email } = res.locals.user;
    const body = req.body;

    const address = await db.collection("address").findOne({email});
    await db.collection("sales").insertOne({...body, address})
}

export {addAddress, callInfo, endShopping}