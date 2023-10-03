import express from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userSchema.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username })

    if (user) {
        return res.status(400).json({ message: "User already exists!, Please Login" })
    }

    if(password.length == 0){
        return res.status(401).json({message:'Password is empty!'})
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password:hashedPass })
    await newUser.save()
    res.status(201).json({ message: "User created successfully" })

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" })
        }

        const isPassValid = await bcrypt.compare(password, user.password)

        if (!isPassValid) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.PRIVATE_TOKEN_KEY)

        res.json({ message: "Login succesfully!", token, userID: user._id })

    } catch (err) {
        console.log(err)
    }

})

export { router as userRouter }