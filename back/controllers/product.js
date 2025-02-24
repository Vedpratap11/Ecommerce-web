import Product from "../models/productModels.js";

export async function addProduct(req,res){
    // console.log(req.body)
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).send({message: "Product Added"})
    }
    catch(error){
        res.status(500).send({message: "Product not added", actualError: error.message })
    }
}