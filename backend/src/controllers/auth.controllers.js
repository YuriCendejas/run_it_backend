import {User} from "../models/user.models.js";

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



export {registerUser};