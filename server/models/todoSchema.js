import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
    todo:{
        type: String,
        required: true,
    },
    mark:{
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
export  {TodoModel}