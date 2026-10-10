import { Router } from "express";

import {createPost,getPosts } from "../controllers/post.controllers.js";
import {protect} from "../middleware/auth.middleware.js"

const router = Router(); 
//creates an express router
router.post('/create',protect,createPost);
router.get("/getPosts",protect,getPosts);

export default router;