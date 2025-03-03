import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
import Admin from "../models/adminModel.js";

export async function loginAdmin(req, res){

    try{
        const {email, password}=req.body;
    
        const admin=await Admin.findOne({email});
        if(!admin) return res.status(404).send({message:"Email not found"});
    
        const passwordMatches=await bcrypt.compare(password, admin.password);
        if(!passwordMatches) return res.status(404).send({message:"Invalid Crendentials"});
    
        //create token & send it back to client as cookie
    
        const adminToken= jwt.sign(
            {id:admin._id , email: admin.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        )
    
        console.log("adminToken", adminToken)
    
        // strict | lax | none
    
        res.cookie("adminToken", adminToken, {
            httponly: false,
            secure: false, 
            sameSite: "strict",
            maxAge: 3600000,
        }).send({message:"Admin login successfull", admin:admin});
    }catch(error){
        return res.status(500).send({message:"Admin not login", errorString: error.message});
    }
    }
    