import uploadToCloudinary from "../middleWares/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import Product from "../models/productModels.js";

export async function addProduct(req,res){
    // console.log(req.body)
    try{
        const file = req.file
        if(!file) return res.status(404).send({message: "File not found"})
        const secure_url = await uploadToCloudinary(req)
        const newProduct = new Product({...req.body, image: secure_url})
        await newProduct.save()
        res.status(201).send({message: "Product Added"})
    }
    catch(error){
        res.status(500).send({message: "Product not added", actualError: error.message })
    }
}

export async function fetchProduct(req, res) {
    try{
        const products = await Product.find({})
        res.send(products)
    }catch(error){
        res.status(500).send({message: "Product not added", actualError: error.message })
    }
    
}

export async function fetchCategories(req, res) {
    try{
       const category = await categoryModel.find({})
       res.send(category)
    }
    catch(error){
        res.status(500).send({message: error.message})
    }
}

export async function addCategory(req, res) {
    console.log(req.body)
    try{
        const file = req.file
        if(!file) return res.status(404).send({message: "File not found"})
        const secure_url = await uploadToCloudinary(req)
        const newCategory = new categoryModel({...req.body, image: secure_url})
        await newCategory.save()
        res.status(201).send({message: "Category Added"})
    }
    catch(error){
        res.status(500).send({message: "Category not added", actualError: error.message })
    }
}