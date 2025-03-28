import mongoose, { Schema } from "mongoose";
import usersModel from "./users.model.js";

const Product = new Schema({
    name: String,
    price: Number,
    imageUrl: String,
    description: String,
    category: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersModel
    }
},{timestamps:true})

export default mongoose.model('Product', Product)