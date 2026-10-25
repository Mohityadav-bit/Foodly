
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Internal server error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.error("Authentication middleware error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuth;





// import jwt from 'jsonwebtoken'


// const isAuth = async (req,res,next) => {
//     try{
//         const token = req.cookies.token
//         if(!token){
//             return res.status(400).json({message:"token not found"})
//         }
//         const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
//         if(!decodeToken){
//             return res.status(400).json({message:"token not verifed"})
//         }
//         req.userId = decodeToken.userId
//         next()
//     }catch(error){
//         return res.status(500).json({message:"isAuth error"})

//     }
// }

// export default isAuth;