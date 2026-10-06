import jwt  from "jsonwebtoken";

const protect = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) // the frontend with request a token starting with "bearer {{token}}"" or bearer hscdubdbs etc...
        return res.status(401).json({message :" no token provided "});

     const token = authHeader.split(" ")[1]; // grabs the actual token without the word "bearer" . splits suppose to make it into an array

    const decoded = jwt.verify(token,process.env.JWT_SECRET); // the verify part is going to make sure is it really a token created by us 
    req.user = decoded; // with the req.user it attaches id and email so it can keep it going without having to keep asking to log in again 
next();  //keep it going 

    
    }catch (error) { return res.status(401).json({message: "Invaild or expired token"});

        
    }
};

export {protect};