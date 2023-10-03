import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model("users" , UserSchema)

export {UserModel}