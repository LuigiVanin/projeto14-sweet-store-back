import db from "../database.js";

const addAddress = async (req, res) => {
    const { email } = res.locals.user;
    const body = req.body;

    try {

        const addressInfo = await db.collection("address").findOne({email});

        if(!addressInfo) {
            await db.collection("address").insertOne(body);
        } else {
            await db.collection("address").updateOne({email}, {$set: body});
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
        res.status(200).send(info);
    } catch (error) {
        res.sendStatus(500);
    }
}

const endShopping = async (req, res) => {
    const { email } = res.locals.user;
    const body = req.body;

    try {

        const address = await db.collection("address").findOne({email});
        await db.collection("sales").insertOne({...body, address});
        await db.collection("carts").deleteMany({email});
        res.status(200).send("Compra efetuada com sucesso!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}

const getAddress = async (req, res) => {
    const { email } = res.locals.user;

    try {
        const info = await db.collection("address").findOne({email});
        res.status(200).send(info);
    } catch (error) {
        res.sendStatus(500);
    }
}


export {addAddress, callInfo, endShopping, getAddress}