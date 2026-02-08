import mongoose, { Schema } from "mongoose";
import productsModel from "./products.model.js";

const User = new Schema({
    name:String,
    email:String,
    password: String,
    cart : [{type: Schema.Types.ObjectId, ref: productsModel}],
    profilePicture: String
})

export default mongoose.model('User', User)