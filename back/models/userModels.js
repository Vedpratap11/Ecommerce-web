import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,

    },
    password:{
        type:String,
        required: true,
    },
    image:{
        type: String,
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",}
    ],
})

const User = mongoose.model("user", userSchema)
export default User