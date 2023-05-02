const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/usere.route")
const { postRouter } = require("./routes/post.route")
const { auth } = require("./middleware/auth.middleware")
const app=express()
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
   try {
      await connection
      console.log("connect to database")
  } catch (error) {
      console.log(error)
      console.log("cannot connect to the database")
  }
  console.log(`server is running at port ${process.env.port}`)

})
