import {Router} from "express";
import { registerUser} from "../controllers/auth.controllers";


const router = Router();

router.post("/register",registerUser) // create register on postmon and test the api 




export default router;
