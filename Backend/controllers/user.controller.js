
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const user = await User.findById(userId).select(
      "-password -resetOtp -isOtpVerified -otpExpires"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};











// export const getCurrentUser = async (req,res) =>{
//     try{
//         const userID = req.userId
//         if(!userId){
//             return res.status(400).json({message:"userId is not found"})
//         }
//         const user = await user.findById(userId)
//         if(!user){
//             return res.status(400).json({message:"user not found"})            
//         }
//         return res.status(200).json(user)
//     }catch(error){
//         return res.status(500).json({message:`get current user error ${error}`})
//     }
// }