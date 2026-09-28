import {Router} from "express";
import { registerUser} from "../controllers/auth.controllers.js";


const router = Router();

router.post("/register",registerUser) // create register on postmon and test the api  "/api/users/register"




export default router;
