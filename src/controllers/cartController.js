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

export { addToCart, callFromCart }