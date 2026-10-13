import { Router } from "express";

import {createPost,getPosts,updatePosts} from "../controllers/post.controllers.js";
import {protect} from "../middleware/auth.middleware.js"

const router = Router(); 
//creates an express router
router.post('/create',protect,createPost);
router.get("/getPosts",protect,getPosts); // the protect is from the auth.middleware file
router.patch("/update/:id",protect,updatePosts); // on postmon you gotta put the real id of the profiles not the word ":id"

export default router;

