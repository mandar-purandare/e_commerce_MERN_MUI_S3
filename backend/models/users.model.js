import mongoose, { Schema } from "mongoose";

const User = new Schema({
    name:String,
    email:String,
    password: String,
    cart : [String],
    profilePicture: String
})

export default mongoose.model('User', User)