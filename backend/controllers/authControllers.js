import usersModel from "../models/users.model.js"
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

export const Register = async (req,res) => {
    try{
        const {name, email, password} = req.body
        if (!name || !email || !password) return res.status(401).json({success: false, message:'All fields are mandatory'})
        const hashedPassword = await bcrypt.hash(password,10)
        const User = new usersModel({
            name,
            email,
            password:hashedPassword
        })

        await User.save()

        return res.status(201).json({success: true, message:'User registered successfully'})

    }catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
    
}

export const Login = async (req, res) => {
    try{
        const{email, password} = req.body
        if(!email || !password) return res.status(401).json({success: false, message:'All fields are mandatory'})
        const fetchedUser = await usersModel.findOne({email})
        if (!fetchedUser) return res.status(401).json({success: false, message:'User not found. Please enter correct email'})
        const isMatchingPassword = await bcrypt.compare(password, fetchedUser.password)
        if(!isMatchingPassword) return res.status(401).json({success: false, message:'Incorrect password'})
        const token = await Jwt.sign({id: fetchedUser._id}, process.env.JWT_SECRET)
        return res.status(200).json({success: true, message:'User logged in successfully', user:fetchedUser, token})
        
    }catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
}

export const GetCurrentUser = async (req,res) => {
   try{
        const {token}  = JSON.parse(JSON.stringify(req.query))
        if (token === '') return res.status(401).json({success:false, message:'Invalid token'})
        const {id} = await Jwt.verify(token,process.env.JWT_SECRET)
        const currentUser = await usersModel.findById(id)
        if(!currentUser) res.status(404).json({success:false, message:'User not found'})
        return res.status(200).json({success:true, message:'Current user fetched successfully', data: currentUser})
   }catch(error){
    return res.status(500).json({success: false, message: error.message})
   }
}

export const UpdateUser = async (req, res) => {
    try {
        const { id, name, email, password, profilePicture } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const updateFields = {}; // Only store changed fields

        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (profilePicture) updateFields.profilePicture = profilePicture;

        if (password && password !== "dummypassword") {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await usersModel.findByIdAndUpdate(
            id, // Find user by ID
            { $set: updateFields }, // Only update changed fields
            { new: true, runValidators: true } // Return updated document & apply validation
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
