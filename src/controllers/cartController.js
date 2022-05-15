import db from "../database.js";

const addToCart = async (req, res) => {
    const cartItems = req.body;
    const {itemId, amount, email} = cartItems;

    try {

        const item = await db.collection("carts").findOne({itemId});
        
        if(item) {
            console.log(item)
            item.amount = parseInt(item.amount) + 1
            
        } else {
            await db.collection("carts").insertOne({
                itemId,
                email,
                amount
            });
        }

        res.status(200).send("Produto adicionado na coleção");

    } catch (error) {

        console.log(error);
        res.send("Não foi possível adicionar produto na coleção");

    }

}

export { addToCart }