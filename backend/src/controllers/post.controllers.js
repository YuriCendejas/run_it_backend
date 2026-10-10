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



 export {createPost,getPosts};