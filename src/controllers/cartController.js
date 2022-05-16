import { ObjectId } from "mongodb";
import db from "../database.js";

const addToCart = async (req, res) => {
    const cartItems = req.body;
    const {itemId, amount, email} = cartItems;

    try {

        const item = await db.collection("carts").findOne({itemId});
        
        if(item) {
            
            await db.collection("carts").updateOne({itemId}, {$inc: {amount: 1}});
            
        } else {

            const productInfo = await db.collection("items").findOne({_id: new ObjectId(itemId)});
            console.log(productInfo)
            
            await db.collection("carts").insertOne({
                itemId,
                email,
                amount,
                name: productInfo.name,
                price: productInfo.price,
                image: productInfo.image,
                description: productInfo.description
            });
        }

        res.status(200).send("Produto adicionado na coleção");

    } catch (error) {

        console.log(error);
        res.send("Não foi possível adicionar produto na coleção");

    }

}

const callFromCart = async (req, res) => {

    const { email } = res.locals.user;
    
    try {
        const cartItems = await db.collection("carts").find({email}).toArray();
        res.status(200).send(cartItems);
    } catch (error) {
        res.sendStatus(500)
    }
}

const updateValue = async (req, res) => {
    const {update, itemId} = req.body;
    try {

        if(update === "increase") {
    
            await db.collection("carts").updateOne({itemId}, {$inc: {amount: 1}});
    
        } else if (update === "decrease") {
    
            await db.collection("carts").updateOne({itemId}, {$inc: {amount: -1}});

            const product = await db.collection("carts").findOne({itemId});
            if (product.amount <= 0) {
                await db.collection("carts").deleteOne({itemId});
            }
    
        }
        res.status(200).send("Atualizou o valor");
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Não atualizou o valor");
    }
}

export { addToCart, callFromCart, updateValue }