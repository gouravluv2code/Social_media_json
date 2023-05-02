const express=require("express")
const postRouter=express.Router()
const {Postmodel}=require("../models/post.model")

postRouter.get("/",async(req,res)=>{
   try {
    // const {device}=req.query
    // let query={}
    // if(device){
    //     query.device=device
    // }
    const postData=await Postmodel.find({authorID:req.body.authorID})
    res.status(200).send(postData)
   } catch (error) {
    res.status(400).send({msg:error.message})
   }
})

postRouter.post("/create",async(req,res)=>{
    try {
        const post=await Postmodel(req.body)
        await post.save()
        res.status(200).send({msg:"new post has been added"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const post=await Postmodel.findOne({_id:id})
    try {
        if(!post){
            res.send("post not found")
        }
        if(post.authorID!==req.body.authorID){
            res.send("Not authorized")
        }
        await Postmodel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({msg:"Post is updated"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post=await Postmodel.findOne({_id:id})
        if(!post){
            res.send("post not found")
        }
        if(post.authorID!==req.body.authorID){
            res.send("Not authorized")
        }
        await Postmodel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Post is deleted"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

module.exports={
    postRouter
}