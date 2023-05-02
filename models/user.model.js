const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
},{
    versionkey:false
})

const Usermodel=mongoose.model("user",userSchema)

module.exports={
    Usermodel
}