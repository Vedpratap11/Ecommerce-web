import bcrypt from "bcrypt"
import User from "../models/userModels.js";
import jwt from "jsonwebtoken"
import { response } from "express";

export async function registerUser(req, res){
try{
    const {name, email, password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new User({name, email, password:hashedPassword});
    await newUser.save();

    res.status(201).send({message:"User registered", user: newUser});
}catch(error){
    return res.status(500).send({message: 'User not registered', errorString: error.message});
}
}


export async function loginUser(req, res){

try{
    const {email, password}=req.body;

    const user=await User.findOne({email});
    if(!user) return res.status(404).send({message:"Email not found"});

    const passwordMatches=await bcrypt.compare(password, user.password);
    if(!passwordMatches) return res.status(404).send({message:"Invalid Crendentials"});

    //create token & send it back to client as cookie

    const loginToken= jwt.sign(
        {id:user._id , email: user.email},
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    )

    console.log("loginToken", loginToken)

    // strict | lax | none

    res.cookie("loginToken", loginToken, {
        httponly: false,
        secure: false, 
        sameSite: "strict",
        maxAge: 3600000,
    }).send({message:"User login successfull", user:user});
}catch(error){
    return res.status(500).send({message:"User not login", errorString: error.message});
}
}

export async function LogoutUser(req, res) {
    res.clearCookie('loginToken')
}