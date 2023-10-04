import express, { request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

import { todoRouter } from './routes/todoRouter.js';
import { userRouter } from './routes/usersRouter.js';

const app = express()
const corsOptions ={
    origin:['http://localhost:3000', 'https://task-manager-app-x4qo.vercel.app'],
    methods : ["POST","GET","DELETE","UPDATE","PATCH"],
    credentials:true,
    optionSuccessStatus:200
}
app.use(express.json())
app.use(cors(corsOptions))
dotenv.config()
const port = process.env.PORT || 5000

mongoose.connect(
    process.env.DATABASE_CONNECTION_STRING
).then(()=>{
    console.log("Database is connected")
})

app.use("/auth",userRouter)
app.use("/todo" , todoRouter)
app.get('/', (req, res) => {
    res.json({message:'welcome to the server'})
  });
  
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})