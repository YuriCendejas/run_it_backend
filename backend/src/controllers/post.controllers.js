import e from "express";
import { post } from "../models/post.models.js";


const createPost = async (req,res) => {
    try {
        const {name,description,age}= req.body;
        // to create a post !
        if (!name || !description||!age){
            return res.status(400).json({message:"all fields needed!"});
        }
        const newPost = await post.create({name,description,age,createdBy:req.user.id,}); // it ties it to who ever made the post

        return res.status(201).json({message:"post created!",post: newPost});

        
    } catch (error) {console.error(error);
         return res.status(500).json({message:"Internal server error"

    });
}
};
const getPosts = async (req,res) => {
    try { 
        const posts = await post.find();
        return res.status(200).json({ posts });
        
    } catch (error) { console.error(error);
        return res.status(500).json({
            message:"internal server error"
        });
    }
};



const updatePosts = async (req,res) => {

try {
    const { name,description,age} = req.body || {};

    //checking to see if any of these were updated in.
    if (name === undefined && 
        description === undefined &&
        age === undefined
    ) {
        return res.status(400).json({message : " no  new fields provided for update "

        });
    }

// finding the post by its ID 
const existingPost = await post.findById(req.params.id);

if (!existingPost){
    return res.status(404).json({message:"post not found"});
    
}

// check to see if the one created is the one trying to update it
if (String(existingPost.createdBy) !== String(req.user.id)) {
    return res.status(403).json({
        message:"not authorized to update this"});
}

// update only the fields provided

if (name !== undefined) existingPost.name = name;
if (description !== undefined){ existingPost.description = description;}
if (age !== undefined) existingPost.age = age;


await existingPost.save() // save the changes to mongodb

return res.status(200).json({message: " post updated ! ",
    post: existingPost}); // adding post lets you see what you posted in postman


} catch (error) {
  console.error(error); return res.status(500).json({message:"Internal server error"});  
}

};



 export {createPost,getPosts,updatePosts};