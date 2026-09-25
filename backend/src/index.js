import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({ path:"./.env"});

const PORT = process.env.PORT || 8090; // so if the port not working the 8090 will be a fallback port number

const startServer = async() => {try {
    await connectDB();
    const server = app.listen(PORT,() =>{
        console.log(`servers running on ${PORT}`);
    }); //starts EXPRESS!

    server.on("error",(error)=>{ console.error("ERROR:",error);
process.exit(1);}); // handles server errors like if a PORT is already taken 

}
 catch (error) {

console.error("server startup failed",error.message);
    
}};

startServer();