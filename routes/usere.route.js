const express=require("express")
const {Usermodel}=require("../models/user.model")
const jwt = require('jsonwebtoken');
const userRouter=express.Router()
// require('dotenv').config()
const bcrypt = require("bcrypt")
userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body

        bcrypt.hash(password, 5, async(err, hash)=>{
           const user=new Usermodel({name,email,gender,password:hash})
           await user.save()
           res.status(200).send({msg:"New user has been Registered"})
        });
       
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await Usermodel.findOne({email})
        if(!user){
            res.send({msg:"User not Registerd"})
        }else{
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                   const token=jwt.sign({authorID:user._id,author:user.name},"masai")
                   res.status(200).send({ msg: "Login Successfull!!", token: token });
                }else{
                    res.status(200).send({msg:"Wrong Credentials"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({ err: err.message });
    }
})

module.exports={
    userRouter
}