import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token"

const signUp = async (req,res) =>{
    try{

        const {fullName,email,password,mobile,role} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User Already exist'})
        }
        if(password.length<6){
            return res.status(400).json({message:'Password must be at least 6 characters.'})
        }
        if(mobile.length<10){
            return res.status(400).json({message:"mobile no must be at least 10 digits"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })

        const token = await genToken(user.id)
        res.cookie("token")

        
    }
    catch(error){

    }
}