var jwt = require('jsonwebtoken');
// require('dotenv').config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
       try {
        const decoded=jwt.verify(token,'masai')
        if(decoded){
            req.body.authorID=decoded.authorID
            req.body.author=decoded.author
            next()
        }else{
            req.send({msg:"Please Login"})
        }
       } catch (error) {
        res.send({msg:error.message})
       }
    }else{
        res.send({msg:"Please Login!!"})
    }
}

module.exports={
    auth
}