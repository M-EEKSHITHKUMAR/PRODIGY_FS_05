import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret=process.env.JWT_KEY;
const authMiddleware = async (req, res, next) => {
    try {
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        if(token){
            const decoded=jwt.verify(token, secret);
            console.log(decoded);
            req.user = { id: decoded._id };
           

        }
       next();
    } catch (error) {
        console.log(error);
        
        
    }


}

export default authMiddleware;