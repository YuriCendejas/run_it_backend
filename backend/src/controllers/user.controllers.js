import { User } from "../models/user.models.js"; 
const getUserProfile = async (req,res) => {
    try {
         const user = await User.findById(req.user.id).select("-password"); // the -password means we dont wanna send that back to the user to view it , so exclude that.
        if(!user){return res.status(404).json({
            message:"user not found"
        }); }
     return res.status(200).json({user}); // sending back your id and email to the user

    } catch (error) { console.error(error); 
        return res.status(500).json({message :" Internal server error"});
        
    }
    
};
export {getUserProfile}; 