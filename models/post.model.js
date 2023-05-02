const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorID:{type:String,required:true},
    device:{type:String,enum:['PC','TABLET','MOBILE'],required:true},
},{
    versionkey:false
})

const Postmodel=mongoose.model("post",postSchema)

module.exports={
    Postmodel
}