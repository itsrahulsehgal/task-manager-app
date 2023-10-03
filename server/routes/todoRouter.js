import express from 'express';
import { TodoModel } from '../models/todoSchema.js'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router()


router.post("/create", verifyToken, async (req, res) => {
    try {
        const { todo } = req.body

        const newTodo = new TodoModel({
            todo,
            user: req.user.id,
        })

        const resTodo = await newTodo.save()
        res.status(201).json(resTodo)

    } catch (error) {
        console.log(error)
    }
})


router.post("/update", verifyToken, async (req, res) => {

    const { _id, todo, mark } = req.body;
    try {
        let todoUser = await TodoModel.findOne({ _id })

        if (todoUser.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" })
        }

        await TodoModel.findByIdAndUpdate(_id, { $set: { todo: todo, mark: mark } })
        res.json({ message: "Todo updated successfully" })

    } catch (error) {
        res.json(error)
    }
})


router.post("/delete", verifyToken, async (req, res) => {
    try {
        
        const { _id } = req.body;
        if(!_id) return res.status(400).json({message: "Please provide todo id"})

        let delTodo = await TodoModel.findOne({ _id })

        if (delTodo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const delRes = await TodoModel.findOneAndRemove({ _id })
        res.json({ message: "Todo deleted successfully" })
    } catch (error) {
        res.json(error)
    }
})


router.get("/read", verifyToken, async (req, res) => {
    try {
        const response = await TodoModel.find({ user: req.user.id })
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


export { router as todoRouter };