import {User} from "../models/user.models.js";
import jwt from "jsonwebtoken";


const registerUser = async (req,res) => { // create the user account
    try {
        const {username,email,password} = req.body; // the req.body data sent by the client to your backend inside the request(the info), stores them in a variable.
        
 if (!username||!password||!email){
    return res.status(400).json({message:"All fields are required"})
 } // everything in there gotta be filled out before moving on , by the user.

 const exists = await User.findOne({
    $or:[{email: email.toLowerCase() }, // || wont work and $or is a mongodb query operator that means this "or" that , (email "or" password)
        {username: username.toLowerCase() }

    ]
 });
if(exists){
    return res.status(400).json({message:'user already exists'}); // something on the user side didnt go right

} 
await User.create({ // this tells mongoose create a new document in the user collection in mongodb with this data
    username,
    password,
    email
}); return res.status(201).json({message:"user created !"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"internal server error"});
    }
    
};

const loginUser = async (req,res) =>{ 
    try {
        const {email,password} =req.body;
        if (!email || !password) { return res.status(400).json({message:" vaild email and password needed ! "});
    }
const user = await User.findOne({
    email : email.toLowerCase(),
});

if(!user) {return res.status(400).json({
    message: 'Invaild email or password' // keep the hackers guessing if its "email or password" thats wrong
})} // if you couldnt find the email of user return a 400 - invaild input 

const isMatch = await user.comparePassword(password);
//making sure the password correctly matches the users account. 
if (!isMatch){ return res.status(400).json({message:"Invaild email or password"});}

//JWT 
const token = jwt.sign({id:user._id, // .sign() bc its going to assign the token for the first time .the inital
    email: user.email,
}, 
process.env.JWT_SECRET, // bc its going to look in the env file for the answer to this.
{expiresIn:process.env.JWT_EXPIRES_IN,} // also in the .env file.
);
return res.status(200).json({message:"Login Succesfull",token});
} catch (error) { console.error(error); return res.status(500).json({message:"Internal server error"});
        
    }
};


const logoutUser = async (req,res) => {
    try {
        
 const {email} =req.body;
 const user = await User.findOne({email});

 if (!user) return res.status(404).json
 ({message : "User Not Found!"});

return res.status(200).json({message:"logout successful!"});
    } catch (error) { console.error(error); 
        return res.status(500).json({message:"Internal server error,"});
    }
    
}
export {registerUser,loginUser,logoutUser};