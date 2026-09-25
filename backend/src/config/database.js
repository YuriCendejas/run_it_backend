import mongoose from "mongoose"; // talks to mongodb database 

const connectDB = async() => {
    try { await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb connected!");
        
    } catch (error) {
        console.error("MongoDb connection failed",error.message);
        process.exit(1);
    }
};
export default connectDB;

