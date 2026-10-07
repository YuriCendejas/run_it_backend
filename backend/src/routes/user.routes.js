import {Router} from "express";
import { registerUser,
    loginUser,
    logoutUser
} from "../controllers/auth.controllers.js";
import { getUserProfile } from "../controllers/user.controllers.js";
import { protect } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/",(req,res) => {
    res.json({message:"user routes works !"})
}); // not needed for actually testing on postmon to work but good practice with or without this little part. test it on curl in the terminal

router.post("/register",registerUser); // create register on postmon and test the api  "/api/users/register"
router.post("/login",loginUser); // login the user if the email and password is correct. 
router.post("/logout",logoutUser);
router.get("/profile",protect,getUserProfile); // middleware with user.controller.js

export default router;
