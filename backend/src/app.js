import express from "express";
import userRoutes from "./routes/user.routes.js";

const app= express(); // creates express app

app.use(express.json());

app.get("/",(req,res) =>{res.send("server is working!");

});

app.use('/api/users',userRoutes); // this connects to the "/register",userRoutes in my user.routes file


export default app;