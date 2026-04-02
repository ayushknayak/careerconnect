import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import cookie from 'cookie-parser';

export const register=async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname||!email||!phoneNumber||!password||!role){
            return res.status(400).json({
                message:"Enter all field",
                success:false
            })
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Email exist, LogIn",
                success:false
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })
        return res.status(200).json({
            message:"Account created Successfuly",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email||!password||!role){
           return res.status(400).json({
                message:"Enter All Fiels then logIn",
                success:false
            })
        }
        const user=await User.findOne({email});
        if(!user){
           return res.status(400).json({
                message:"Sign Up First",
                success:false
            })
        }
        const ispassmatch=await bcrypt.compare(password,user.password);
        if(!ispassmatch){
            return res.status(400).json({
                message:"Invalid Email Or password",
                success:false
            })
        }
        if(role!==user.role){
           return res.status(400).json({
                message:"Account does not exist with this role",
                success:false
            })
        }

        const tokenData={
            userId:user._id
        }
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:`Logout successfully,`,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile=async(req,res)=>{
    try {
        
    
    const {fullname,email,phoneNumber,bio,skills}=req.body;
    if(!fullname||!email||!phoneNumber||!bio||!skills){
        return res.status(400).json({
            message:'enter all fields',
            success:false
        })
    }

    const skillArray=skills.split(',');
    const userId=req.id;
    let user=await User.findById({userId});
    if(!user){
        return res.status(400).json({
            message:'User not exist',
            success:false
        })
    }

    user.fullname=fullname,
    user.email=email,
    user.phoneNumber=phoneNumber,
    user.bio=bio,
    user.skills=skillArray

    await user.save();

    user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        message:"Updated successfully",
        user,
        success:true
    })
}
catch (error) {
        console.log(error);
    }

}