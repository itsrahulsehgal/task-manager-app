import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

import { todoRouter } from './routes/todoRouter.js';
import { userRouter } from './routes/usersRouter.js';

const app = express()
const corsOptions = {
    origin:['https://task-manager-app-x4qo.vercel.app'], 
    methods : ["POST","GET"],
    credentials: true, 
  };
//   app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://task-manager-app-x4qo.vercel.app");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
  
app.use(cors(corsOptions))
app.use(express.json())
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
