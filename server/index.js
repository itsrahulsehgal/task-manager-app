import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

import { todoRouter } from './routes/todoRouter.js';
import { userRouter } from './routes/usersRouter.js';

const app = express()
app.use(express.json())
const corsOptions = {
    origin:['*'], 
    methods : ["POST","GET"],
    credentials: true, 
  };
app.use(cors(corsOptions))
dotenv.config()
const port = 3003


mongoose.connect(
    process.env.DATABASE_CONNECTION_STRING
).then(()=>{
    console.log("Database is connected")
})

app.use("/auth",userRouter)
app.use("/todo" , todoRouter)

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
