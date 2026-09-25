import express from "express";

const app= express(); // creates express app

app.use(express.json());

app.get("/",(req,res) =>{res.send("server is working!");

});


export default app;