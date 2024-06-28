import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const collection = db.collection('products')
    const products = await collection.find().limit(10).toArray()
    return res.json({data:products})
});

productRouter.get("/:id",async (req, res) => {
    const collection = db.collection('products')
    const productsId = new ObjectId(req.params.id)
    const products = await collection.findOne({_id:productsId})
    return res.json({data:products})
});

productRouter.post("/", async(req, res) => {
    const collection = db.collection('products')
    const productData = {...req.body, creted_at: new Date()}
    const newProductData = await collection.insertOne(productData)
    return res.json({
        message: `Product ${newProductData.insertedId} has been created successfully`
    })
});

productRouter.put("/:id", async(req, res) => {
    const collection = db.collection('products')
    const productsId = new ObjectId(req.params.id)
    const newProductData = {...req.body}
    await collection.updateOne({
        _id:productsId
    },{
        $set:newProductData
    })
    return res.json({message: `Product ${productsId} has been updated successfully`})
});

productRouter.delete("/:id", async(req, res) => {
    const collection = db.collection('products')
    const productsId = new ObjectId(req.params.id)
    await collection.deleteOne({_id:productsId})
    return res.json({message: `Product ${productsId} has been deleted successfully`})
});

export default productRouter;
