import db from "../database.js";

const getItems = async (req, res) => {
    const page = req.query.page;

    try {
        let items;
        const collection = db.collection("items");
        if (page) {
            items = await collection
                .find({})
                .limit(7)
                .skip((page - 1) * 7)
                .toArray();
        } else {
            items = await collection.find({}).toArray();
        }

        return res.status(200).send(items);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const getCategories = async (req, res) => {
    try {
        const cats = await db.collection("categories").find({}).toArray();
        return res.status(200).send(cats);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const getItemByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const items = await db
            .collection("items")
            .find({ categoryId })
            .toArray();
        if (!items.length) {
            return res
                .status(422)
                .send({ message: "essa categoria não existe" });
        }
        return res.status(200).send(items);
    } catch (err) {
        console.log(err);
        return res.sendStatu(500);
    }
};

export { getItems, getCategories, getItemByCategory };
