//Mongoose is a third party package tahat allows us to interact with MongoDB
//It is an object data modeling (ODM) library for MongoDB and Node.js
import mongoose from "mongoose"



//Schema is a blueprint of how the data will be stored in the database
const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    usualPrice : {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        
    }


})

//Model is a class with which we construct documents
const Product = mongoose.model("Product", productSchema)

export default Product