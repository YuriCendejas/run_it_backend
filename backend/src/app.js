import express from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
const app= express(); // creates express app

app.use(express.json());

app.get("/",(req,res) =>{res.send("server is working!");

});

app.use('/api/users',userRoutes); // this connects to the user.routes file . everything in user.routes starts with /api/users/ on postmon
app.use("/api/posts",postRoutes); // from post.routes.js file

export default app;