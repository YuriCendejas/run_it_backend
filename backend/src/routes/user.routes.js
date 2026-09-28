import {Router} from "express";
import { registerUser} from "../controllers/auth.controllers.js";


const router = Router();

router.get("/",(req,res) => {
    res.json({message:"user routes works !"})
}); // not needed for actually testing on postmon to work but good practice with or without this little part. test it on curl in the terminal

router.post("/register",registerUser) // create register on postmon and test the api  "/api/users/register"




export default router;
