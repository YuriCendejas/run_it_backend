import { post } from "../models/post.models.js";

const createPost = async (req,res) => {
    try {
        const {name,description,age}= req.body;
        // to create a post !
        if (!name || !description||!age){
            return res.status(400).json({message:"all fields needed!"});
        }
        const post = await post.create({name,description,age});
        

        
    } catch (error) {
        
    }
}